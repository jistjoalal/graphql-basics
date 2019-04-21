import { GraphQLServer } from 'graphql-yoga'
import uuidv4 from 'uuid/v4';

// demo data
const USERS = [
  {
    id: '1',
    name: 'Andrew',
    email: 'a@g.com',
    age: 28,
  },
  {
    id: '2',
    name: 'Bill',
    email: 'b@g.com',
  },
  {
    id: '3',
    name: 'Kate',
    email: 'k@g.com',
  },
]
const POSTS = [
  {
    id: '1',
    title: 'a post',
    body: 'the best post',
    published: true,
    author: '1',
  },
  {
    id: '2',
    title: 'a cool post',
    body: 'the coolest post',
    published: true,
    author: '1',
  },
  {
    id: '3',
    title: 'a bad post',
    body: 'the worst post',
    published: false,
    author: '3',
  }
]
const COMMENTS = [
  {
    id: '1',
    text: 'a comment',
    author: '1',
    post: '2',
  },
  {
    id: '2',
    text: 'another comment',
    author: '1',
    post: '2',
  },
  {
    id: '3',
    text: 'another one',
    author: '1',
    post: '1',
  },
  {
    id: '4',
    text: 'another great one',
    author: '3',
    post: '2',
  },
]

// type defs
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    comments(query: String): [Comment!]!
    me: User!
    post: Post!
  }

  type Mutation {
    createUser(name: String!, email: String!, age: Int): User!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
  }
`;

// resolvers
const resolvers = {
  Query: {
    users(_, { query }) {
      if (!query) return USERS
      query = query.toLowerCase()
      return USERS.filter(({ name }) =>
        name.toLowerCase().includes(query)
      );
    },
    posts(_, { query }) {
      if (!query) return POSTS
      query = query.toLowerCase()
      return POSTS.filter(({ title, body }) =>
        (
          title.toLowerCase().includes(query)
          || body.toLowerCase().includes(query)
        )
      )
    },
    comments(_, { query }) {
      if (!query) return COMMENTS
      query = query.toLowerCase()
      return COMMENTS.filter(({ text }) =>
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
    createUser(_, args) {
      const emailTaken = USERS.some(({ email }) =>
        email == args.email
      )
      if (emailTaken) {
        throw new Error('Email taken.')
      }
      const user = {
        id: uuidv4(),
        name: args.name,
        email: args.email,
        age: args.age,
      }
      USERS.push(user);
      return user;
    }
  },
  Post: {
    author(parent) {
      return USERS.find(({ id }) => 
        id === parent.author
      )
    },
    comments(parent) {
      return COMMENTS.filter(({ post }) =>
        post == parent.id
      )
    }
  },
  User: {
    posts(parent) {
      return POSTS.filter(({ author }) =>
        author == parent.id
      )
    },
    comments(parent) {
      return COMMENTS.filter(({ author }) =>
        author == parent.id
      )
    }
  },
  Comment: {
    author(parent) {
      return USERS.find(({ id }) =>
        id == parent.author
      )
    },
    post(parent) {
      return POSTS.find(({ id }) =>
        id == parent.post
      )
    }
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
})

server.start(() => {
  console.log('server running')
})
