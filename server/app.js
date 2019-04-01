// const express = require('express');
// const app = express();
// const graphqlHttp = require('express-graphql');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const {createServer} = require('http');
// require('dotenv').config();
//
const apolloSchema = require('./graphql/apollo/schema');
const apolloResolvers = require('./graphql/apollo/resolvers');
// const { graphqlExpress, graphiqlExpress} = require('apollo-server-express');
//
// const {execute, subscribe} = require('graphql');
// const graphQlResolvers = require('./graphql/resolvers');
//
// const {SubscriptionServer} = require('subscriptions-transport-ws');
//
// const checkAuth = require('./middleware/check-auth');
//
// const subscriptionsEndpoint = `ws://localhost:${process.env.PORT}/subscriptions`;
//
//
// // middleware
//
// express.json();
//
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     if (req.method === 'OPTIONS') {
//         return res.sendStatus(200);
//     }
//     next();
// });
//
// app.use(checkAuth);
//
// app.use('/graphql', graphiqlExpress({
//     endpointURL: '/graphql',
//     subscriptionsEndpoint: `ws://localhost:3000/subscriptions`
// }));
//
// app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: apolloSchema }));
//
//
// app.use('/hello-world', (req, res, next) => {
//     res.status(200).json({
//         hello: 'Hello World'
//     })
// });
//
// const server = createServer(app);
//
// mongoose.set('useCreateIndex',true);
//
// // connect to MongoDB
// mongoose.connect(`mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PW}@drinksapp-otvvz.mongodb.net/${process.env.DB_NAME}?retryWrites=true`, {useNewUrlParser: true})
//     .then(() => {
//         // app.listen(process.env.PORT);
//         server.listen(process.env.PORT, () => {
//             new SubscriptionServer({
//                     execute,
//                     subscribe,
//                     schema: apolloSchema
//                 },
//                 {
//                     server,
//                     path: '/subscriptions'
//                 }
//             )
//         });
//     })
//     .catch(err => {
//         console.log(err);
//     });

const express = require('express');
const app = express();
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');
const {createServer} = require('http');
require('dotenv').config();

const {execute, subscribe} = require('graphql');
const graphQLSchema = require('./graphql/schema');
const graphQlResolvers = require('./graphql/resolvers');

const {SubscriptionServer} = require('subscriptions-transport-ws');

const checkAuth = require('./middleware/check-auth');

const subscriptionsEndpoint = `ws://localhost:${process.env.PORT}/subscriptions`;


// middleware

express.json();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use(checkAuth);

app.use('/graphql', graphqlHttp({
    schema: graphQLSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
    subscriptionsEndpoint: subscriptionsEndpoint
}));

app.use('/graphiql', graphqlHttp({
    schema: apolloSchema,
    rootValue: apolloResolvers,
    graphiql: true,
    subscriptionsEndpoint: subscriptionsEndpoint
}));


app.use('/hello-world', (req, res, next) => {
    res.status(200).json({
        hello: 'Hello World'
    })
});

const server = createServer(app);

mongoose.set('useCreateIndex',true);

// connect to MongoDB
mongoose.connect(`mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PW}@drinksapp-otvvz.mongodb.net/${process.env.DB_NAME}?retryWrites=true`, {useNewUrlParser: true})
    .then(() => {
        // app.listen(process.env.PORT);
        server.listen(process.env.PORT, () => {
            new SubscriptionServer({
                    execute,
                    subscribe,
                    schema: apolloSchema
                },
                {
                    server,
                    path: '/subscriptions'
                }
            )
        });
    })
    .catch(err => {
        console.log(err);
    });
