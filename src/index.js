import { GraphQLServer } from 'graphql-yoga';

// Scalar types:
// - String, Boolean, Int, Float, ID


// type defs
const typeDefs = `
  type Query {
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
  }
`;

// resolvers
const resolvers = {
  Query: {
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
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
})
server.start(() => {
  console.log('server running')
})
