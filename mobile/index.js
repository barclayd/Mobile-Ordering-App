import App from './App';
import {AppRegistry} from 'react-native';
import React from 'react';
import {SubscriptionClient} from "subscriptions-transport-ws";
import {Provider} from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import {WebSocketLink} from "apollo-link-ws";
import ReduxLink from 'apollo-link-redux';
import { ReduxCache } from 'apollo-cache-redux';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloLink } from 'apollo-link';
import configureStore from "./src/store/configureStore";
import createSagaMiddleware from 'redux-saga';
import {watchAuth, watchBar, watchBasket, watchCollectionPoint, watchDrinks, watchOrder} from "./src/store/sagas";
import {ApolloClient} from "apollo-client";

const wsClient = new SubscriptionClient(`ws://localhost:3000/subscriptions`, {
    reconnect: true,
});

const sagaMiddleware = createSagaMiddleware();

const store = configureStore(sagaMiddleware);

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchBar);
sagaMiddleware.run(watchDrinks);
sagaMiddleware.run(watchBasket);
sagaMiddleware.run(watchOrder);
sagaMiddleware.run(watchCollectionPoint);

const reduxLink = new ReduxLink(store);

const cache = new ReduxCache({ store });

const webSocketLink = new WebSocketLink(wsClient);

const requestLink = ({ queryOrMutationLink, subscriptionLink }) =>
    ApolloLink.split(
        ({ query }) => {
            const { kind, operation } = getMainDefinition(query);
            return kind === 'OperationDefinition' && operation === 'subscription';
        },
        subscriptionLink,
        queryOrMutationLink,
    );

const link = ApolloLink.from([
    reduxLink,
    requestLink({
        subscriptionLink: webSocketLink,
    }),
]);

export const client = new ApolloClient({
    link,
    cache
});

const app = (
    <ApolloProvider client={client}>
        <Provider store={store}>
                <App />
        </Provider>
    </ApolloProvider>
);

AppRegistry.registerComponent('drinKing', () => app);
