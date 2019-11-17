# Multiple REST resources
This example illustrates the concept of multiple REST resources.

## Getting Started
There are two REST resources: `users` and `locations` and three RESTful services:

1. `GET /users/{name}/friends`
Returns a JSON array of `id` of `name`'s friends

2. `GET /friends/{id}`
Returns a JSON object `user` of a specific user `id`

3. `GET /location/{id}`
Returns the `name` of a specific location `id`

### Installing
```
npm install
```
### Running
```
npm start
```
### Testing
1. Get ids of jane's friends
```
curl -v -X GET http://localhost:4000/users/jane/friends
```
2. Get jane's details
```
curl -v -X GET http://localhost:4000/friends/1
```
3. Get details of location 1
```
curl -v -X GET http://localhost:4000/location/1
```