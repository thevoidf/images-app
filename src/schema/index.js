const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type Image {
    id: ID!
    user: String!
    name: String!
    path: String!
    size: Int!
    type: String!
  }

  type Query {
    images(user: String): [Image!]!
  }
`);
