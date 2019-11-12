/*
curl -X POST -H "Content-Type: application/json" --data '{ "query": "{persons {name}}"}' http://localhost:4000/graphql
*/

const express = require('express');
const express_graphql = require('express-graphql');
const { buildSchema } = require('graphql');

// some hardcoded data
const persons = [
  {name: 'Paul', age: 40, posts: [{title: 'professor'},{title: 'dean'}]},
  {name: 'Mary', age: 28, posts: [{title: 'officer'}]},
  {name: 'Ada', age: 19, posts: [{title: 'student'},{title: 'tennis clud vice-chair'}]}
];

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    persons: [Person]
    allPersons(last: Int!): [Person]
  },

  type Post {
    title: String!
  }

  type Person {
    name: String!
    age: Int!
    posts: [Post]
  },
`);

// The root provides a resolver function for each API endpoint
const root = {
  persons: () => {
    return persons;
  },
  
  allPersons: (args) => {
    let results = [];
    for (i = persons.length - args.last; i < persons.length; i++) {
      results.push(persons[i]);
    }
    return results;
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