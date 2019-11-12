# GraphQL
This example demonstrates the basic concepts of [GraphQL]{https://graphql.org}.

Two `schemas` are defined for two resources (`Post`and `Person`) and their relationship (one-to-many):
1. `Post`
2. `Person`

Two `queries` are defined:
1. `persons` - returns all persons in `persons` array
2. `allPersons(last)` - returns the `last` number of persons in `persons` array

## Getting Started

### Installing
```
npm install
```
### Running
```
npm start
```
### Testing
1. Get names of all persons
```
curl -X POST -H "Content-Type: application/json" --data '{ "query": "{persons {name}}"}' http://localhost:4000/graphql

```
2. Get names. ages and post titles of all persons
```
curl -X POST -H "Content-Type: application/json" --data '{ "query": "{persons {name age posts {title}}}"}' http://localhost:4000/graphql

```
3. Get names of last two persons
```
curl -X POST -H "Content-Type: application/json" --data '{ "query": "{allPersons(last:2) {name}}"}' http://localhost:4000/graphql
```
