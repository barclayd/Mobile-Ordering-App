import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import {watchOrders, watchDrinks} from './store/sagas/index';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import ordersReducer from "../src/store/reducers/order";
import drinksReducer from "../src/store/reducers/drinks"

const rootReducer = combineReducers({
  orders: ordersReducer,
  drinks: drinksReducer
});

const sagaMiddleware = createSagaMiddleware();

sagaMiddleware.run(watchOrders);
sagaMiddleware.run(watchDrinks);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

const app = (
  <Provider store={store}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(
  app
  , document.getElementById('root'));
registerServiceWorker();
