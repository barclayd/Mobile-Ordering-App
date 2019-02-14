import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';
import configureStore from './src/store/configureStore';
import AuthScreen from "./src/screens/Auth/Auth";
import ViewDrinks from './src/screens/ViewDrinks/ViewDrinks';
import SideDrawer from './src/screens/SideDraw/SideDraw';
import Settings from './src/screens/Settings/Settings';
import WelcomeScreen from './src/screens/WelcomeScreen/WelcomeScreen';
import {setWelcomePageRoot, setDefaultSettings} from './src/utility/navigation';
import * as screens from './src/utility/screens';

const store = configureStore();

// register screens
Navigation.registerComponentWithRedux(screens.AuthScreen, () => AuthScreen, Provider, store);
Navigation.registerComponentWithRedux(screens.WelcomeScreen, () => WelcomeScreen, Provider, store);
Navigation.registerComponentWithRedux(screens.ViewDrinksScreen, () => ViewDrinks, Provider, store);
Navigation.registerComponentWithRedux(screens.SideDrawer, () => SideDrawer, Provider, store);
Navigation.registerComponentWithRedux(screens.Settings, () => Settings, Provider, store);


Navigation.events().registerAppLaunchedListener(() => {
  setDefaultSettings();
  setWelcomePageRoot();
});

