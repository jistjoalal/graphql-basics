import { GraphQLServer } from 'graphql-yoga'
import uuidv4 from 'uuid/v4'

import db from './db'

// resolvers
const resolvers = {
  Query: {
    users(_, { query }, { db }) {
      if (!query) return db.users
      query = query.toLowerCase()
      return db.users.filter(({ name }) =>
        name.toLowerCase().includes(query)
      );
    },
    posts(_, { query }, { db }) {
      if (!query) return db.posts
      query = query.toLowerCase()
      return db.posts.filter(({ title, body }) =>
        (
          title.toLowerCase().includes(query)
          || body.toLowerCase().includes(query)
        )
      )
    },
    comments(_, { query }, { db }) {
      if (!query) return db.comments
      query = query.toLowerCase()
      return db.comments.filter(({ text }) =>
        text.toLowerCase().includes(query)
      )
    },
    me() {
      return {
        id: '123',
        name: 'Mike',
        email: 'mike@g.com',
      }
    },
    post() {
      return {
        id: '234',
        title: 'guide to swag',
        body: 'step 1 wear a top hat like Abe Lincoln',
        published: true,
      }
    }
  },
  Mutation: {
    createUser(_, args, { db }) {
      const emailTaken = db.users.some(({ email }) =>
        email == args.data.email
      )
      if (emailTaken) {
        throw new Error('Email taken.')
      }
      const user = {
        id: uuidv4(),
        ...args.data,
      }
      db.users.push(user);
      return user;
    },
    deleteUser(_, args, { db }) {
      const userIdx = db.users.findIndex(({ id }) =>
        id == args.id 
      )
      if (userIdx == -1) {
        throw new Error('User not found.')
      }
      // remove user
      const deletedUsers = db.users.splice(userIdx, 1)
      // remove users posts
      db.posts = db.posts.filter(({ author, id }) => {
        const match = author == args.id
        if (match) {
          // remove posts comments
          db.comments = db.comments.filter(({ post }) =>
            post != id
          )
        }
        return !match
      })
      // remove users comments
      db.comments = db.comments.filter(({ author }) => author != args.id)
      return deletedUsers[0]
    },
    createPost(_, args, { db }) {
      const userExists = db.users.some(({ id }) =>
        id == args.data.author
      )
      if (!userExists) {
        throw new Error('User not found.')
      }
      const post = {
        id: uuidv4(),
        ...args.data,
      }
      db.posts.push(post);
      return post;
    },
    deletePost(_, args, { db }) {
      const postIdx = db.posts.findIndex(({ id }) => id == args.id)
      if (postIdx == -1) {
        throw new Error('User not found.')
      }
      // remove post
      const deletedPosts = db.posts.splice(postIdx, 1)
      // remove posts comments
      db.comments = db.comments.filter(({ post }) => post != args.id)
      return deletedPosts[0]
    },
    createComment(_, args, { db }) {
      const userExists = db.users.some(({ id }) => id == args.data.author)
      if (!userExists) {
        throw new Error('User not found.')
      }
      const post = db.posts.find(({ id }) => id == args.data.post)
      if (!post || !post.published) {
        throw new Error('Post not found.')
      }
      const comment = {
        id: uuidv4(),
        ...args.data,
      }
      db.comments.push(comment)
      return comment
    },
    deleteComment(_, args, { db }) {
      const commentIdx = db.comments.findIndex(({ id }) => id == args.id)
      if (commentIdx == -1) {
        throw new Error('Comment not found.')
      }
      // remove comment
      const deletedComments = db.comments.splice(commentIdx, 1)
      return deletedComments[0]
    },
  },
  Post: {
    author(parent, _, { db }) {
      return db.users.find(({ id }) => 
        id === parent.author
      )
    },
    comments(parent, _, { db }) {
      return db.comments.filter(({ post }) =>
        post == parent.id
      )
    }
  },
  User: {
    posts(parent, _, { db }) {
      return db.posts.filter(({ author }) =>
        author == parent.id
      )
    },
    comments(parent, _, { db }) {
      return db.comments.filter(({ author }) =>
        author == parent.id
      )
    }
  },
  Comment: {
    author(parent, _, { db }) {
      return db.users.find(({ id }) =>
        id == parent.author
      )
    },
    post(parent, _, { db }) {
      return db.posts.find(({ id }) =>
        id == parent.post
      )
    }
  }
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {
    db,
  }
})

server.start(() => {
  console.log('server running')
})
