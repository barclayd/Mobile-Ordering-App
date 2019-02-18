const {buildSchema} = require('graphql');

module.exports = buildSchema(`

     type User {
            _id: ID!
            email: String!
            password: String
            name: String!
        }

    type Drink {
            _id: ID!
            name: String!
            type: String!
            nutritionInfo: String!
            price: String!
    }
        
     type Bar {
            _id: ID!
            name: String!
            barCode: String!
            type: String!
            description: String!
            latitude: Float!
            longitude: Float!
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
        
        input BarInput {
            name: String!
            type: String!
            description: String!
            latitude: Float!
            longitude: Float!
        }

        input DrinkInput {
            name: String!
            type: String!
            nutritionInfo: String!
            price: Float!
        }
        
        type RootQuery {
           login(email: String!, password: String!): AuthData!
           findBar(barCode: String!): Bar!
           findDrinks(type: String!): [Drink!]!
           drinks: [Drink!]!
        }
        
        type RootMutation {
            createUser(userInput: UserInput): User
            createBar(barInput: BarInput): Bar
            createDrink(drinkInput: DrinkInput): Drink
        }
        
        schema {
            query: RootQuery
            mutation: RootMutation
        }
`);
