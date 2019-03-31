import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import authReducer from './reducers/auth';
import barReducer from './reducers/bar';
import drinkReducer from './reducers/drinks';
import orderReducer from './reducers/order';
import basketReducer from './reducers/basket';
import collectionPointReducer from './reducers/collectionPoint';
import createGraphQLSubscriptionsMiddleware from 'redux-graphql-subscriptions';

const rootReducer = combineReducers({
    auth: authReducer,
    bar: barReducer,
    drink: drinkReducer,
    order: orderReducer,
    basket: basketReducer,
    collectionPoint : collectionPointReducer
});

let composeEnhancers = compose;
if(__DEV__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const graphQLSubscriptionsMiddleware = createGraphQLSubscriptionsMiddleware('ws://localhost:3000/subscriptions', { reconnect: true });


const configureStore = (sagaMiddleware) => {
    return createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware, graphQLSubscriptionsMiddleware)));
};

export default configureStore;
