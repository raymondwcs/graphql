const express = require('express');
const express_graphql = require('express-graphql').graphqlHTTP;
const { buildSchema } = require('graphql');

// REST resource: users
const users = [
  {id: "1", name: "jane", location: "aud", friends: ["2","3"]},
  {id: "2", name: "peter", location: "jp", friends: ["1"]},
  {id: "3", name: "mary", location: "cad", friends: ["1"]}
];

// REST resource: locations
const locations = [
  {id: "aud", name: "australia"},
  {id: "jp", name: "japan"},
  {id: "cad", name: "canada"}
];

// Construct a schema, using GraphQL schema language

const schema = buildSchema(`
  type Query {
    friends(name: String!): [Friend]
  },

  type Friend {
    name: String
    location: String
  }
`);

// The root provides a resolver function for each API endpoint
const root = {  
  friends: (args) => {
    // Get ids of user's friend; filter() returns an array
    let targetUser = users.filter(u => {
      return u.name == args.name;
    });
    let friendsOfTargetUser = [];
    // find user's friends
    targetUser[0].friends.forEach(fid => {
      users.forEach(u => {
        if (u.id == fid) {
          locations.forEach(loc => {
            if (loc.id == u.location) {
              u.location = loc.name;
            }
          })
          friendsOfTargetUser.push(u);
        }
      });
    });
    return(friendsOfTargetUser);
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