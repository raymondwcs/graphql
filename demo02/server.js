/*
curl -X POST -H "Content-Type: application/json" --data @body.json http://localhost:4000/graphql

In body.json:

{
    "query": "query {invoiceAmtHKD(invoiceNo: \"00001\") {amount}}"
}
*/
var request = require('sync-request');
var express = require('express');
var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');

var APIKEY="";       //**your API key***

var options = {
    host: 'apilayer.net',
    port: 80,
    path: '/api/live?access_key=' + APIKEY + '&currencies=USD,JPY&source=HKD',
    method: 'GET'
};

var quotes={};
// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    invoiceAmtHKD(invoiceNo: String!): invoiceAmt
  },

  type invoiceAmt {
    invoiceNo: String!
    amount: Float!
  },
`);

// some hardcoded data
var invoices = [
  {invoiceNo: "00001", amt: 70,   currency: "HKD"},
  {invoiceNo: "00002", amt: 1800, currency: "JPY"},
];

// The root provides a resolver function for each API endpoint

var root = {
  invoiceAmtHKD: function (args) {
    var amt = 0;
    var currency = "USD";
    for (var i=0; i<invoices.length; i++) {
      if (invoices[i].invoiceNo === args.invoiceNo) {
        amt = invoices[i].amt;
        currency = invoices[i].currency;
      }
    }
    var path = 'http://apilayer.net/api/live?access_key=' + APIKEY + '&currencies=' + currency + '&source=USD';
    var response = request('GET',path);
    //console.log(JSON.parse(response.getBody()));
    var rate = JSON.parse(response.getBody()).quotes['USD'+currency];
    var invoiceAmt = {};
    invoiceAmt['invoiceNo'] = args.invoiceNo;
    invoiceAmt['amount'] = amt * rate;
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