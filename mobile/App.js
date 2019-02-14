import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';
import configureStore from './src/store/configureStore';
import AuthScreen from "./src/screens/Auth/Auth";
import ViewDrinks from './src/screens/ViewDrinks/ViewDrinks';
import SideDrawer from './src/screens/SideDraw/SideDraw';
import Settings from './src/screens/Settings/Settings';
import WelcomeScreen from './src/screens/WelcomeScreen/WelcomeScreen';
import ViewMenus from './src/screens/Menus/Menus';

const store = configureStore();

// register screens
Navigation.registerComponentWithRedux("drinks-app.AuthScreen", () => AuthScreen, Provider, store);
Navigation.registerComponentWithRedux("drinks-app.WelcomeScreen", () => WelcomeScreen, Provider, store);
Navigation.registerComponentWithRedux("drinks-app.ViewDrinksScreen", () => ViewDrinks, Provider, store);
Navigation.registerComponentWithRedux("drinks-app.SideDrawer", () => SideDrawer, Provider, store);
Navigation.registerComponentWithRedux("drinks-app.Settings", () => Settings, Provider, store);
Navigation.registerComponentWithRedux("drinks-app.ViewMenus", () => ViewMenus, Provider, store);


Navigation.events().registerAppLaunchedListener(() => {

  Navigation.setDefaultOptions({
    topBar: {
      visible: false
    },
    statusBar: {
      style: "light"
    },
    sideMenu: {
      left: {
        visible: false,
        enabled: false
      },
      right: {
        visible: false,
        enabled: false
      }
    }
  });

  Navigation.setRoot({
    root: {
      sideMenu: {
        left: {
          component: {
            name: 'drinks-app.SideDrawer',
            id: 'SideDrawer'
          },
        },
        center: {
          stack: {
            options: {
              topBar: {
                visible: false
              }
            },
            id: 'WelcomeScreen',
            children: [
              {
                component: {
                  name: 'drinks-app.WelcomeScreen',
                },
              },
            ],
          },
        },
        right: {
          component: {
            name: 'drinks-app.Settings',
            id: 'Settings',
          },
        },
      },
    }
  });
});

