import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';
import configureStore from './src/store/configureStore';
import AuthScreen from "./src/screens/Auth/Auth";
import ViewDrinks from './src/screens/ViewDrinks/ViewDrinks';
import SideDrawer from './src/screens/SideDraw/SideDraw';
import Settings from './src/screens/Settings/Settings';
import WelcomeScreen from './src/screens/WelcomeScreen/WelcomeScreen';
import OrderStatus from './src/screens/OrderStatus/OrderStatus';
import ViewPastOrders from './src/screens/ViewPastOrders/ViewPastOrders';
import {setWelcomePageRoot, setDefaultSettings} from './src/utility/navigation';
import * as screens from './src/utility/screens';
import createSagaMiddleware from 'redux-saga';
import {watchAuth, watchBar, watchDrinks, watchBasket, watchOrder} from './src/store/sagas/index';
import ViewMenus from './src/screens/Menus/Menus';
import ViewCheckout from './src/components/HOC/Checkout/Checkout';
const sagaMiddleware = createSagaMiddleware();

const store = configureStore(sagaMiddleware);

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchBar);
sagaMiddleware.run(watchDrinks);
sagaMiddleware.run(watchBasket);
sagaMiddleware.run(watchOrder);

// register screens
Navigation.registerComponentWithRedux(screens.AuthScreen, () => AuthScreen, Provider, store);
Navigation.registerComponentWithRedux(screens.WelcomeScreen, () => WelcomeScreen, Provider, store);
Navigation.registerComponentWithRedux(screens.ViewDrinksScreen, () => ViewDrinks, Provider, store);
Navigation.registerComponentWithRedux(screens.SideDrawer, () => SideDrawer, Provider, store);
Navigation.registerComponentWithRedux(screens.Settings, () => Settings, Provider, store);
Navigation.registerComponentWithRedux(screens.ViewMenus, () => ViewMenus, Provider, store);
Navigation.registerComponentWithRedux(screens.ViewCheckout, () => ViewCheckout, Provider, store);
Navigation.registerComponentWithRedux(screens.OrderStatus, () => OrderStatus, Provider, store);
Navigation.registerComponentWithRedux(screens.ViewPastOrders, () => ViewPastOrders, Provider, store);

Navigation.events().registerAppLaunchedListener(() => {
  setDefaultSettings();
  setWelcomePageRoot();
});

