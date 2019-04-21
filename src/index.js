import { GraphQLServer } from 'graphql-yoga';

// Scalar types:
// - String, Boolean, Int, Float, ID


// type defs
const typeDefs = `
  type Query {
    title: String!
    price: Float!
    releaseYear: Int
    rating: Float
    inStock: Boolean!
  }
`;

// resolvers
const resolvers = {
  Query: {
    title() {
      return 'Big boat'
    },
    price() {
      return '3.15'
    },
    releaseYear() {
      return 1994
    },
    rating() {
      return null
    },
    inStock() {
      return false
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
