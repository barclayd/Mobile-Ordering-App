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
     
     type Order {
        drinks: ID!
        collectionPoint: String!
        status: String!
        promotionID: String!
        orderAssignedTo: ID!
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
        
     type Bar {
            _id: ID!
            name: String!
            barCode: String!
            type: String!
            description: String!
            latitude: Float!
            longitude: Float!
        }
        
        type BarStaff {
            userId: ID!
            firstName: String!
            surname: String!
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
        
        input barStaff {
            firstName: String!
            surname: String!
        }
        
        input stock {
            collectionPointId: ID!
            ingredientId: ID!
            inStock: Boolean!
        }

        input DrinkInput {
            _id: ID!
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
           findOrderById(orderId: String!) : [Order!]!
           findDrinks(category: String!): [Drink!]!           
           drinks: [Drink!]!
           findUserById(userId: String!): [BarStaff!]!
           findIngredients(name: String!): [Ingredient!]!
           findDrinkCategories: [Category!]!
        }
        
        type RootMutation {
            createUser(userInput: UserInput): User
            createBar(barInput: BarInput): Bar
            createOrder(drinkInputId: ID) : [Order!]!
            editOrderById(orderId: String!) : [Order!]!
            createDrink(drinkInput: DrinkInput): Drink
            createIngredient(ingredientInput: IngredientInput): Ingredient
        }
        
        schema {
            query: RootQuery
            mutation: RootMutation
        }
`);
