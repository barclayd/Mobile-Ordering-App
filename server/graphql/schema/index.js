const {buildSchema} = require('graphql');

module.exports = buildSchema(`

     type User {
            _id: ID!
            email: String!
            password: String
            name: String!
        }
        
     type Category {
        category: String!
     }
        
    type Drink {
            _id: ID!
            name: String!
            category: String!
            nutritionInfo: String!
            price: String!
    }
    
    type Ingredient {
            _id: ID!
            name: String!
            amount: String!
            allergy: String
            containsAlcohol: Boolean!
    }
    
    type Order {
        _id: ID!
        collectionPoint: String!
        drinks: [Drink!]
        orderAssignedTo: String
        status: String!
        date: String!
        userInfo: User!
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
    
    input OrderInput {
        drinks: [ID!]
        collectionPoint: String!
        status: String!
        date: String!
        userInfo: ID!
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
        category: String!
        nutritionInfo: String!
        price: String!
    }
    
    input IngredientInput {
        name: String!
        amount: String!
        allergy: String
        containsAlcohol: Boolean!
    }
    
    type RootQuery {
       login(email: String!, password: String!): AuthData!
       findBar(barCode: String!): Bar!
       findDrinks(category: String!): [Drink!]!
       drinks: [Drink!]!
       findIngredients(name: String!): [Ingredient!]!
       findDrinkCategories: [Category!]!
       findOrders: [Order!]!
       findOrdersByUser(userInfo: ID!): [Order!]!
    }
    
    type RootMutation {
        createUser(userInput: UserInput): User
        createBar(barInput: BarInput): Bar
        createDrink(drinkInput: DrinkInput): Drink
        createIngredient(ingredientInput: IngredientInput): Ingredient
        createOrder(orderInput: OrderInput): Order
    }
    
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
