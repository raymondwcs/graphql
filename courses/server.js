/*
curl -X POST -H "Content-Type: application/json" --data '{ "query": "{courses {title}}"}' http://localhost:4000/graphql
*/

const express = require('express');
const express_graphql = require('express-graphql').graphqlHTTP;
const { buildSchema } = require('graphql');

// some hardcoded data
const coursesData = [
  {
      id: 1,
      title: 'The Complete Node.js Developer Course',
      author: 'Andrew Mead, Rob Percival',
      description: 'Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!',
      topic: 'Node.js',
      url: 'https://codingthesmartway.com/courses/nodejs/'
  },
  {
      id: 2,
      title: 'Node.js, Express & MongoDB Dev to Deployment',
      author: 'Brad Traversy',
      description: 'Learn by example building & deploying real-world Node.js applications from absolute scratch',
      topic: 'Node.js',
      url: 'https://codingthesmartway.com/courses/nodejs-express-mongodb/'
  },
  {
      id: 3,
      title: 'JavaScript: Understanding The Weird Parts',
      author: 'Anthony Alicea',
      description: 'An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.',
      topic: 'JavaScript',
      url: 'https://codingthesmartway.com/courses/understand-javascript/'
  }
]


// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    courses: [Course],
    course(id: Int!): Course
  },

  type Course {
    id: Int
    title: String
    author: String
    description: String
    topic: String
    url: String
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  courses: () => {
    return coursesData;
  },
  course: (args) => {
    let id = args.id;
    return coursesData.filter(course => {
      return course.id == id;
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