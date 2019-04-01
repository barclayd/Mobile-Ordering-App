const { makeExecutableSchema } = require('graphql-tools');

const resolvers = require("../resolvers/resolvers");

const typeDefs =[ `
type User {
        _id: ID!
        email: String!
        password: String
        name: String!
        lastVisitedBar: Bar
        }
        
     type Category {
        category: String!
     }
     
     type Menu {
        _id: ID!
        name: String!
        drinks: [Drink]
        description: String!
        image: String
     }
     
     type BarStaff {
        _id: ID!
        firstName: String
        lastName: String
        bar: Bar!
     }
     
     type CollectionPoint {
        _id: ID! 
        name: String!
        bar: Bar!
        collectionPointId: String
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
        _id: ID
        collectionPoint: CollectionPoint
        drinks: [Drink!]
        orderAssignedTo: BarStaff
        status: String
        date: String
        userInfo: User
        transactionId: String,
        collectionId: String,
        price: Float
    }
        
     type Bar {
        _id: ID!
        name: String!
        barCode: String!
        type: String!
        description: String!
        latitude: Float!
        longitude: Float!
        image: String
        logo: String
        menus: [Menu]
     }
        
    type AuthData {
        userId: ID!
        token: String!
        tokenExpiration: Int!
        name: String!
        lastVisitedBar: Bar
    }
    
    input BarStaffInput {
        firstName: String!
        lastName: String!
        barId: ID!
    }
    
    input UserInput {
        email: String!
        password: String!
        name: String!
        role: String!
    }
    
    input MenuInput {
        name: String!
        drinks: [ID!]
        description: String!
        image: String
    }
    
    input CollectionPointInput {
        name: String!
        bar: ID!
    }
    
    input OrderInput {
        drinks: [ID!]
        collectionPoint: ID!
        status: String!
        date: String!
        userInfo: ID!
        price: Float!
    }
    
    
    input BarInput {
        name: String!
        type: String!
        description: String!
        latitude: Float!
        longitude: Float!
        image: String
        logo: String
        menus: [ID!]
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
    
    input OrderAssignedToInput {
        orderId: ID!
        barStaffId: ID
    }

    input OrderStatusInput {
        orderId: ID!
        status: String!
        barStaffId: ID
    }
    
    type Query {
       login(email: String!, password: String!): AuthData!
       findBar(barCode: String!): Bar!
       findAllBars: [Bar]
       findDrinks(category: String!): [Drink!]!
       drinks: [Drink!]!
       findIngredients(name: String!): [Ingredient!]!
       findDrinkCategories: [Category!]!
       findDrinkCategoriesByMenu(menuId: ID!): [Category]
       findOrders: [Order!]!
       findAllMenus: [Menu]
       findOrdersByUser(userInfo: ID!): [Order!]!
       findOrdersByCollectionPoint(collectionPoint: ID!): [Order!]!
       findOrderById(id: ID!): Order!
       findCollectionPoints: [CollectionPoint]
       findCollectionPointById: CollectionPoint
       findCollectionPointsByBar(barId: ID!): [CollectionPoint]
       findBarStaffByBar(barId: ID!): [BarStaff]
    }
    
    type Mutation {
        createUser(userInput: UserInput): User
        createBar(barInput: BarInput): Bar
        createDrink(drinkInput: DrinkInput): Drink
        createIngredient(ingredientInput: IngredientInput): Ingredient
        createOrder(orderInput: OrderInput): Order
        createCollectionPoint(collectionPointInput: CollectionPointInput): CollectionPoint
        createBarStaffMember(barStaffInput: BarStaffInput): BarStaff
        createMenu(menuInput: MenuInput): Menu
        updateOrderAssignedTo(orderAssignedToInput: OrderAssignedToInput): Order
        updateLastVisitedBar(userId: ID!, barId: ID): User!
        updateOrder(orderStatusInput: OrderStatusInput): Order!
    }
    
    type Subscription {
        orderUpdated(orderId: ID!): Order!
        orderCreated(collectionPointId: ID!): [Order!]
    }
    
    schema {
        query: Query
        mutation: Mutation
        subscription: Subscription
    }
`];

const apolloServer = makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers
});


module.exports = apolloServer;
