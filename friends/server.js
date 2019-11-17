const express = require('express');

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
]

const app = express();
// GET /users/jane/friends returns IDs of jane's friends
app.get('/users/:name/friends', (req,res) => {
  let results = users.filter((user) => {
    return user.name == req.params.name;
  })
  if (results.length > 0) {
    delete results[0].id; delete results[0].name;
    results = results[0].friends;
  }
  res.status(200).json(results).end();
});

// GET /friends/1   returns json object user jane
app.get('/friends/:id', (req,res) => {
  let results = users.filter((user) => {
    return user.id == req.params.id;
  })
  if (results.length > 0) {
    res.status(200).json(results[0]).end();
  } else {
    res.status(200).json({}).end();
  }
})

// GET /location/aud    returns {name: "australia"}
app.get('/location/:id', (req,res) => {
  let results = locations.filter((loc) => {
    return loc.id == req.params.id;
  })
  if (results.length > 0) {
    res.status(200).json(results[0]).end();
  } else {
    res.status(200).json({}).end();
  }
});


app.listen(4000, () => console.log('Express Server Now Running On localhost:4000/graphql'));