import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import AuthScreen from "./src/screens/Auth/Auth";
import ViewDrinks from './src/screens/ViewDrinks/ViewDrinks';
import SideDrawer from './src/screens/SideDraw/SideDraw';
import Settings from './src/screens/Settings/Settings';
import WelcomeScreen from './src/screens/WelcomeScreen/WelcomeScreen';

// register screens
Navigation.registerComponent("drinks-app.AuthScreen", () => AuthScreen);
Navigation.registerComponent("drinks-app.WelcomeScreen", () => WelcomeScreen);
Navigation.registerComponent("drinks-app.ViewDrinksScreen", () => ViewDrinks);
Navigation.registerComponent("drinks-app.SideDrawer", () => SideDrawer);
Navigation.registerComponent("drinks-app.Settings", () => Settings);


    Navigation.events().registerAppLaunchedListener(() => {
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
                id: 'AuthScreen',
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
  })
});