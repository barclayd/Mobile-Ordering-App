# DrinKing - Mobile App

## Motivation

The mobile app serves as the client facing application to provide users with a way to view menus for DrinKing bars, select drinks and place an order. The application was decided to be a native mobile app, to be available via Apple’s App Store and Google Play Store, due to the features a native app provides, such as use of location services, notifications and ease of use for the customer. The mobile application communicates with the DrinKing terminal through use of the Node.js server via HTTP requests for data requests and websockets for real time data.

## Code style

#standard logo - nothing else needed here


## Demos and Screenshots

  
## Tech/framework used

Built with

-   Native mobile app framework (iOS and Android) - React Native
-   State Management – Redux and Redux Saga
-   Routing - React Native Navigation
-   GraphQL client - Apollo Client  
-   HTTP Client - axios
-   Maps - React Native Maps
-   Authentication - Node.js server
-   Real-time data transfer - GraphQL subscriptions
-   Styling: React Native Elements
-   Development: React Native Debugger
-   Payment handler/Stripe client: Tipsi-stripe
-   Testing: Jest
    
## Design and Usability Decisions

As a team, we opted for an unencrypted QR code. Following on from large entities such as KFC and McDonalds. The decision was taken to allow our users to scan their codes faster and more reliably than a complicated encrypted QR code. The information which can be seen from scanning another user’s QR code is simply what would be shown on a physical receipt, that being their order number. Our response to this is warning the user to not share their QR codes with other users.

The mobile app uses [React Native Navigation v2.](https://github.com/wix/react-native-navigation/tree/v2)
This decision was taken to provide our users with ergonomic screen layouts and navigation links such as our intuitive side drawer and centre stack screen which screens can be pushed on top of.

The mobile application design implements a simple yet clean design to display information clearly to the user with a nested doll approach combined with the use of side-menus. The mobile app runs natively on device to reflect the traditional styles of both iOS and android. Steps have been taken to reduce user input and taps as much as possible to make an order. The design principles of reducing scrolling, expand for more and the use of loading indicators in prevalent throughout the app. Orientation is also restricted to portrait only.

A key functional requirement was for users to easily to purchase orders. Our solution doesn't require a user to create an account if they do not wish, instead, providing a valid email address is all they need to make a successful order.

## Features

- [x]   Create account
- [x] Sign in to account
- [x]  Auto login
- [x] Find bar by 4 letter code
- [x] Find bar by maps view
- [x] Find closest DrinKing supported bar.
- [x] Switch bar.
- [x] Dynamically loaded menus and drinks list per bar
- [x] View and select menu
- [x] Add drinks to virtual basket
- [x]  Update quantity of drinks selected
- [x] Delete basket
- [x] Create an order
- [x] Select a collection point at checkout
- [x] Pay for order using card, processed via Stripe
- [x] Pay for an order without user authentication
- [x] See active order information.
- [x] See past orders
- [x] Filter past orders by date and orderId
- [x] Notifications upon order being ready for collection
- [x] Automatic order status updating
    
## Styling Decisions

Our customer mobile app has been inspired by Black Mirror prototype apps which use a linear gradient and background image together which creates a translucent effect.

![nosedive-kit-preview-](/uploads/cced6c49a4b0b11f5a570c4829e3306b/nosedive-kit-preview-.jpg)

Our mobile application uses many external packages which we feel excel the user experience for a truly native application. We have used the react-native-elements library for ready-made out of the box components such as card, list item, badge and overlay. [https://react-native-training.github.io/react-native-elements/docs/card.html](https://react-native-training.github.io/react-native-elements/docs/card.html)

We have used packages to provide a native feel such as filtering past order by date and selecting the collection point. ![Screenshot_2019-04-03_at_19.06.55](/uploads/d5c33142faac984398ef223386a62b05/Screenshot_2019-04-03_at_19.06.55.png)

![Screenshot_2019-04-03_at_23.38.15](/uploads/295d5460c8dcd4a2e9fd9044e9098987/Screenshot_2019-04-03_at_23.38.15.png)

The application has also been styled to dynamically match the native mobile operating system, iOS or Android, through the use of platform specific styling. This extends to traditional components found natively such as date/list pickers as well as icons that match the theme of the device that their on. 

When external components were not quite the right fit for our implementation we have hand-built certain components to fit particularly use cases such as buttons with coloured backgrounds and unique full-screen backgrounds with a linear-gradient layered above to provide an individual set of components that are unique to the app.

## Available Scripts

### `npm ios`
Looks for Xcode and builds the iOS version of the mobile app
### `npm android`
Looks for Android Studio and builds the Android version of the mobile app
### `npm test`
Runs the suite of tests
## How to Run (Android mobile app simulator only)
  ```
  $ git clone https://gitlab.cs.cf.ac.uk/c1673342/drinks-app.git
  $ cd Drinks-App
  $ cd mobile
  $ npm android
  ```
Please note that an instance of the server should also be started.

Alternatively to npm android, the project can be opened in Android Studio from there and the ‘Build’ command excuted.
## How to Run (iOS mobile app simulator only)
  ```
  $ git clone https://gitlab.cs.cf.ac.uk/c1673342/drinks-app.git
  $ cd Drinks-App
  $ cd mobile
  $ npm ios
  ```
Please note that an instance of the server should also be started.
Alernatively to ```npm ios``` the project can be opened in Xcode and run ‘Build’.

## How to Run on Native Device
Please follow this [guide](https://facebook.github.io/react-native/docs/running-on-device) provided by React Native
## Tests and Test Strategy
0
## Organisation of Code

The mobile app is structured using best practise methods. Components hold all stateless, functional components used in the project whereas containers hold all stateful, class based components. Screens hold all screens registered and viewable as part of the application. Store hold all actions, reducers and sagas used within the implementation of advanced Redux in the project. Assets include all images retrieved locally and kept as part of the application bundle.

## Installed Packages


*  `apollo-cache-inmemory`  
*  `apollo-cache-redux`  
*   `apollo-client`  
*   `apollo-link`  
*   `apollo-link-http`  
*   `apollo-link-redux`  
*   `apollo-link-ws`  
*   `apollo-utilities`  
*   `axios`  
*   `graphql-tag`          
*   `react`  
*   `react-apollo`  
*   `react-native`  
*   `react-native-animatable`  
*   `react-native-collapsible`  
*   `react-native-credit-card-input`  
*   `react-native-elements`  
*   `react-native-linear-gradient`  
*   `react-native-maps`  
*   `react-native-modal`  
*   `react-native-modal-datetime-picker`  
*   `react-native-navigation`  
*   `react-native-notification-banner`  
*   `react-native-payments`  
*   `react-native-picker-select`  
*   `react-native-progress`  
*   `react-native-push-notification`  
*   `react-native-qrcode-svg`  
*   `react-native-scrollable-tab-view`  
*   `react-native-simple-stepper`  
*   `react-native-svg`  
*   `react-native-svg-transformer`  
*   `react-native-swiper`  
*   `react-native-vector-icon`  
*   `react-redux`  
*   `redux-graphql-subscriptions`  
*   `redux-saga`  
*   `rn-sliding-up-panel`  
*   `subscriptions-transport-ws`  
*   `tipsi-stripe`
## Plans for expanding the project

-   Group orders to facilitate the building of virtual rounds with cost splitting
-   Support for remote notifications    
-   Support for Apple Pay 
-   Sign in with Social Media accounts 
-   Welsh language support
    

## Current limitations of Solution
-   No support Apple Pay due to requirement of a paid Apple Develop License
-   App is yet to be deployed to App Store due to lack of Apple Develop License
-   Apple Developer license required for remote notifications
## Links

-   [Taiga](https://taiga.cs.cf.ac.uk/project/c1632962-drinks-ordering-app)
-   [Mongo DB Atlas](https://cloud.mongodb.com/v2/5c5996d8ff7a25e136324f18#clusters/detail/DrinksApp)
    
## References
-   [React Native]([https://facebook.github.io/react-native/](https://facebook.github.io/react-native/))
-   [React Native Elements](https://react-native-training.github.io/react-native-elements/)
