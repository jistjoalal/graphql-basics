import { GraphQLServer } from 'graphql-yoga';

// type defs
const typeDefs = `
  type Query {
    hello: String!
    name: String!
    location: String!
    bio: String!
  }
`;

// resolvers
const resolvers = {
  Query: {
    hello() {
      return 'First query';
    },
    name() {
      return 'Andrew Mead';
    },
    location() {
      return 'The moon';
    },
    bio() {
      return "I'm the guy on the moon";
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
})
server.start(() => {
  console.log('server running')
})
