import { GraphQLServer } from 'graphql-yoga'

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

// type defs
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    me: User!
    post: Post!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
  }
`;

// resolvers
const resolvers = {
  Query: {
    users(_, args) {
      const query = args.query.toLowerCase()
      if (!query) return USERS
      return USERS.filter(({ name }) =>
        name.toLowerCase().includes(query)
      );
    },
    posts(_, args) {
      const query = args.query.toLowerCase()
      if (!query) return POSTS
      return POSTS.filter(({ title, body }) =>
        (
          title.toLowerCase().includes(query)
          || body.toLowerCase().includes(query)
        )
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
  Post: {
    author(parent) {
      return USERS.find(({ id }) => 
        id === parent.author
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
