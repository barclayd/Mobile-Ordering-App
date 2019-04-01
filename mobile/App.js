import React, {Component} from 'react';
import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';
import configureStore from './src/store/configureStore';
import AuthScreen from "./src/screens/Auth/Auth";
import ViewDrinks from './src/screens/ViewDrinks/ViewDrinks';
import SideDrawer from './src/screens/SideDraw/SideDraw';
import Settings from './src/screens/Settings/Settings';
import WelcomeScreen from './src/screens/WelcomeScreen/WelcomeScreen';
import ActiveOrder from './src/screens/ActiveOrder/ActiveOrder';
import ViewPastOrders from './src/screens/ViewPastOrders/ViewPastOrders';
import SwitchBar from './src/screens/SwitchBar/SwitchBar';
import {setWelcomePageRoot, setDefaultSettings} from './src/utility/navigation';
import * as screens from './src/utility/screens';
import ViewMenus from './src/screens/Menus/Menus';
import ViewCheckout from './src/components/HOC/Checkout/Checkout';
import { ApolloProvider} from 'react-apollo';
import {WebSocketLink} from "apollo-link-ws";
import { getMainDefinition } from 'apollo-utilities';
import {split} from 'apollo-link';
import createSagaMiddleware from 'redux-saga';
import {watchAuth, watchBar, watchBasket, watchCollectionPoint, watchDrinks, watchOrder} from "./src/store/sagas";
import {ApolloClient} from "apollo-client";
import withProvider from './src/components/HOC/Apollo/withProvider';
import {HttpLink} from "apollo-link-http";
import {InMemoryCache} from "apollo-cache-inmemory";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore(sagaMiddleware);

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchBar);
sagaMiddleware.run(watchDrinks);
sagaMiddleware.run(watchBasket);
sagaMiddleware.run(watchOrder);
sagaMiddleware.run(watchCollectionPoint);

const httpLink = new HttpLink({
    uri: 'http://localhost:3000/graphql',
});
const wsLink = new WebSocketLink({
    uri: 'ws://localhost:3000/subscriptions',
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

// register screens
  Navigation.registerComponentWithRedux(screens.AuthScreen, () => AuthScreen, Provider, store);
  Navigation.registerComponentWithRedux(screens.WelcomeScreen, () => WelcomeScreen, Provider, store);
  Navigation.registerComponentWithRedux(screens.ViewDrinksScreen, () => ViewDrinks, Provider, store);
  Navigation.registerComponentWithRedux(screens.SideDrawer, () => SideDrawer, Provider, store);
  Navigation.registerComponentWithRedux(screens.Settings, () => Settings, Provider, store);
  Navigation.registerComponentWithRedux(screens.ViewMenus, () => ViewMenus, Provider, store);
  Navigation.registerComponentWithRedux(screens.ViewCheckout, () => ViewCheckout, Provider, store);
  Navigation.registerComponent(screens.ActiveOrder, () => withProvider(ActiveOrder, store, client));
  Navigation.registerComponentWithRedux(screens.ViewPastOrders, () => ViewPastOrders, Provider, store);
  Navigation.registerComponentWithRedux(screens.SwitchBar, () => SwitchBar, Provider, store);


  Navigation.events().registerAppLaunchedListener(async () => {
    setDefaultSettings();
    await setWelcomePageRoot();
  });

export default class App extends Component {
  render() {
    return (
        <ApolloProvider client={client}>
          <Provider store={store}>
              <App />
          </Provider>
        </ApolloProvider>
    );
  }
}
