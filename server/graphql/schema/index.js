const {buildSchema} = require('graphql');

module.exports = buildSchema(`

     type User {
            _id: ID!
            email: String!
            password: String
            name: String!
        }
        
        type AuthData {
            userId: ID!
            token: String!
            tokenExpiration: Int!
            name: String!
        }
        
        input UserInput {
            email: String!
            password: String!
            name: String!
            role: String!
        }
        
        type RootQuery {
           login(email: String!, password: String!): AuthData!
        }
        
        type RootMutation {
            createUser(userInput: UserInput): User
        }
        
        schema {
            query: RootQuery
            mutation: RootMutation
        }
`);
