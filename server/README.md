# DrinKing: Server 🌍

The server powers all three applications as well as providing the business logic to manipulate the data from the MongoDB Atlas database. The server run uses an Node.js express set-up. Further to this, the server uses Apollo Client to utilise GraphQL as the query language for the MongoDB.

## Code style
  [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

## System Architecture  

We are using a Mongo database with APIs defined and queried using GraphQL. Our customer react-native Android / iOS App communicates to our database through this Node.js server. We are receiving live data changes by use of GraphQL subscriptions, enabled using an Apollo client.

![51801019_289983681694391_8594841858423652352_n](/uploads/642f2bacf40070ed1c766db3285233df/51801019_289983681694391_8594841858423652352_n.png)

## Database Schmea
<img width="800" alt="Database Models and Schema" src="https://user-images.githubusercontent.com/39765499/53703777-babdab00-3e0d-11e9-8f45-136b54e106a8.png">
</br>

## Code structure

The backend server follows loosely the traditional Model View Controller (MVC) pattern. Models are for MongoDB collections are defined under 'models', the schema of operations (queries, mutations and subscriptions) defined as permissible by GraphQL is defined and the business logic for this (controllers) is handled in 'resolvers'.

## Testing

To test APIs defined by the server, run the server and navigate to: localhost:3000/graphql where the GraphiQL interface will be accessible to test queries, mutations and subscriptions.

## Available Scripts

### `npm start`
This starts the server in development mode using Nodemon, which auto-restarts after changes to the server code base.
### `npm run prod`
This starts the server in production mode.

## How to Run

  ```
  $ git clone https://gitlab.cs.cf.ac.uk/c1673342/drinks-app.git
  $ cd Drinks-App
  $ cd server
  $ npm i
  $ npm run start
  ```

## Features
- [x] Bar Staff terminal app can listen to changes such as new orders.
- [x] Mobile App updates order status when Terminal app changes the status or order such as “IN_PROGRESS” TO “AWAITING_COLLECTION”

### Future plans for expansion

* Server Deployment
* Ingredients schema support
* Enhanced server-side security

---
#### References

## Links

### [Mobile App](https://gitlab.cs.cf.ac.uk/c1673342/drinks-app/blob/master/mobile/README.md)
### [Terminal App](https://gitlab.cs.cf.ac.uk/c1673342/drinks-app/tree/master/terminal)
