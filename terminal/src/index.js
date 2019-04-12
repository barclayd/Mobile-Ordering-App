import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import ordersReducer from './store/reducers/order'
import collectionPointsReducer from './store/reducers/collectionPoint'
import barReducer from './store/reducers/bar'
import {watchOrders, watchBar} from './store/sagas/index';
import { ApolloProvider} from 'react-apollo';
import {WebSocketLink} from "apollo-link-ws";
import { getMainDefinition } from 'apollo-utilities';
import {split} from 'apollo-link';
import {ApolloClient} from "apollo-client";
import {HttpLink} from "apollo-link-http";
import {InMemoryCache} from "apollo-cache-inmemory";

const rootReducer = combineReducers({
    orders: ordersReducer,
    collectionPoints: collectionPointsReducer,
    bar: barReducer
});

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(watchOrders);
sagaMiddleware.run(watchBar);

const httpLink = new HttpLink({
    // uri: `http://localhost:${process.env.PORT || 3000}/graphql`,
    uri: 'https://powerful-stream-57309.herokuapp.com/graphql'
});
const wsLink = new WebSocketLink({
    // uri: `ws://localhost:${process.env.PORT || 3000}/subscriptions`,
    uri: 'wss://powerful-stream-57309.herokuapp.com/subscriptions',
    options: {
        reconnect: true
    },
});
const link = split(
    ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpLink,
);
const cache = new InMemoryCache();
const client = new ApolloClient({ link, cache });


const app = (
    <ApolloProvider client={client}>
        <Provider store={store}>
            <App />
        </Provider>
    </ApolloProvider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

