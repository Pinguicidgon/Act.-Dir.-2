// schema.ts
export const schema = `#graphql
  type Flight {
    id: ID!
    origin: String!
    destination: String!
    dateTime: String!
  }

  type Query {
    getFlights(origin: String, destination: String): [Flight!]!
    getFlight(id: ID!): Flight
  }

  type Mutation {
    addFlight(origin: String!, destination: String!, dateTime: String!): Flight!
  }
`;
