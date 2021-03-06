/*
curl -X POST -H "Content-Type: application/json" --data '{ "query": "{users {name}}"}' http://localhost:4000/graphql
*/

const express = require('express');
const express_graphql = require('express-graphql').graphqlHTTP;
const { buildSchema } = require('graphql');

// some hardcoded data
const users = [
  {id: "001", name: "John", gender: "m", age: 25},
  {id: "002", name: "Mary", gender: "f", age: 18}
];

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    users: [User]
    user(id: String!): User
  },

  type User {
    id: String!
    name: String!
    gender: String!
    age: Int!
  },
`);

// The root provides a resolver function for each API endpoint
const root = {
  users: () => {
    return users;
  },
  
  /* 
  {user(id:"001") {
    id,name,age
  }}
  */
  user: (args) => {
    let userID = args.id;
    return users.filter(user => {
      return user.id == userID;
    })[0];
  }
};

// Create an express server and a GraphQL endpoint
const app = express();
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));