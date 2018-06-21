/*
curl -X POST -H "Content-Type: application/json" --data '{ "query": "{allPersons {name}}"}' http://localhost:4000/graphql
*/

var express = require('express');
var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    allPersons: [Person]
  },

  type Person {
    name: String!
    age: Int!
  },

  type Post {
    title: String!
    author: Person!
  }
`);

// some hardcoded data
var users = [
  {name: "John",age: 25},
  {name: "Mary",age: 18}
];

// The root provides a resolver function for each API endpoint
var root = {
  allPersons: () => {
    return users;
  },
};

// Create an express server and a GraphQL endpoint
var app = express();
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));