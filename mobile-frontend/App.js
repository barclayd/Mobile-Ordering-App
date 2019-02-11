import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import AuthScreen from "./src/screens/Auth/Auth";
import ViewDrinks from './src/screens/ViewDrinks/ViewDrinks';
import SideDrawer from './src/screens/SideDraw/SideDraw';
import Settings from './src/screens/Settings/Settings';

// register screens
Navigation.registerComponent("drinks-app.AuthScreen", () => AuthScreen);
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
                      name: 'drinks-app.AuthScreen',
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
