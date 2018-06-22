/*
curl -X POST -H "Content-Type: application/json" --data @body.json http://localhost:4000/graphql

In body.json:

{
    "query": "query {invoiceAmtHKD(invoiceNo: \"00001\") {amount}}"
}
*/

var express = require('express');
var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    invoiceAmtHKD(invoiceNo: String!): invoiceAmt
  },

  type invoiceAmt {
    invoiceNo: String!
    amount: Int!
  },
`);

// some hardcoded data
var invoices = [
  {invoiceNo: "00001", amt: 70,   currency: "USD"},
  {invoiceNo: "00002", amt: 1800, currency: "JPY"},
];

// The root provides a resolver function for each API endpoint

var root = {
  invoiceAmtHKD: function (args) {
    var invoiceAmt = {};
    invoiceAmt['invoiceNo'] = "xxxxx";
    invoiceAmt['amount'] = 0;
    return(invoiceAmt);
  }
};

// Create an express server and a GraphQL endpoint
var app = express();
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));