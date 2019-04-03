# Drin*King* - The drinks ordering app :beers:
## Motivation
Age old problem of lengthy and unfair queues at bars or other establishments. 
Opportunity as our development team is located in Cardiff with a wealth of students and bars.
Problem is identified and backed by each member, therefore, we support the decision to commit
Ourselves to develop our drinking solution.

## Code style
  [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

## Tech/framework used
<b>Built with</b>
* Native mobile app framework (iOS and Android) - React Native
* State Management – Redux and Redux Saga
* Routing - React Native Navigation
* GraphQL client - Apollo Client
* HTTP Client - axios
* Authentication - Firebase Auth API
* Hosting: Firebase
* Real-time data transfer - GraphQL subscriptions
* Styling: Ant.d, node-sass, normalize.css
* Development: React Native Debugger
* Payment handler/Stripe client: Tipsi-stripe
* Testing: Jest


## Features
- [x] Create account
- [x] Sign in to account
- [x] Auto login
- [x] Find bar by 4 letter code
- [x] Find bar by maps view
- [x] Find closest drinking enabled bar.
- [x] Switch bar.
- [x] View and select menu
- [x] Add drinks to virtual basket.
- [x] Update quantity of drinks selected.
- [x] Delete basket
- [x] Create an order
- [x] Pay for order using card
- [x] Pay for an order without user authentication.
- [x] See active order information.
- [x] See past orders
- [x] Filter past orders by date and orderId


## Design, Usability and Styling Decisions

As a team, we opted for an unencrypted QR code. Following on from large entities such as KFC and McDonalds.
The decision was taken to allow our users to scan their codes faster and more reliably than a complicated encrypted QR code.
The information which can be seen from scanning another user’s QR code is simply what would be shown on a physical receipt, that being their order number. 
Our response to this is warning the user to not share their QR codes with other users.

Our mobile App uses react-navigation-v2. (https://github.com/wix/react-native-navigation/tree/v2)
This decision was taken to provide our users with ergonomic screen layouts and navigation links such as our intuitive side drawer and centre stack screen which screens can be pushed on top of.

Our customer mobile app has been inspired by black mirror prototype apps which use a linear gradient and background image together which creates a translucent effect. 

![51874735_414641755952587_1458543474650382336_n](/uploads/d492c80272616dfab7a9d22667bafc36/51874735_414641755952587_1458543474650382336_n.png)

![nosedive-kit-preview-](/uploads/cced6c49a4b0b11f5a570c4829e3306b/nosedive-kit-preview-.jpg)


### Schema visual
<img width="800" alt="Database Models and Schema" src="https://user-images.githubusercontent.com/39765499/53703777-babdab00-3e0d-11e9-8f45-136b54e106a8.png">

## Available Scripts
### `npm install`
Installs dependencies needed to run the app
### `npm start`
Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.<br>
*NOTE:* You must have an instance of the GraphQL server running, connected to a DB containing at least a bar, collection point and bartender setup to use the terminal.

## Tests and Test Strategy
## Organisation of Code






<br/>
<br/>
<br/>

## Supported Accessibility
## Tech/framework used
## Design and Usability Decisions
## Features
- [x] Sample feature

## Styling Decisions
## Available Scripts
## Tests and Test Strategy
## Organisation of Code


## Features
- [x] All features one tap away. Using ajax communication, the page is never redirected or reloaded.
- [x] Stock management UI, allowing individual ingredients and drinks to be marked out of stock
- [ ] Stock management backend - *BLOCKED:* No schema table for ingredients
- [x] Staff management & easy staff account switching
- [x] Intelligent queuing algorithm that studies upcoming orders to match and pull similar orders together to help bar staff efficiently complete multiple orders at once
- [x] Hotbar to switch staff members, dynamically showing as many as possible on-screen in one line
- [x] Hotbar of staff members is sorted by most recent login from switch accounts window to avoid the need to manually configure staff shifts
- [x] Staff can mark orders as awaiting pickup, cancelled, refunded or complete (upon pickup)
- [x] Feed of in-progress orders showing only those assigned/taken to the logged in bartender
- [x] Feed of upcoming orders (pending orders) available via popup
- [x] Feed of orders awaiting collection for the collection point, shown to all staff using terminals at the given collection point
- [x] Toggleable collapsing of awaiting orders feed to keep UI clean
- [x] Webcam scanner to let customers use QR codes in their receipt to authenticate themselves at the collection point and pickup their order
- [x] Webcam scanner preview to test camera quality
- [x] Popup to change collection point for terminal
- [x] Switch accounts (adds switched account to hotbar), manual order pickup (by order code on receipt, as failsafe for scan fails), upcoming orders (shows feed of unassigned pending orders)
- [x] Billing popup (allows stock management, viewing of items & prices, refunding and cancellation) and pickup popup (shown when a QR is scanned or entered manually, allows marking as completed/collected and all other billing options)
- [x] Animated notifications with styles for errors, info, success and warnings for new orders, marking orders as complete, scan fails, collection point switching and more
- [x] Detailed loading screen showing API loading stage
- [x] Placeholder UI for when no orders are active to explain each area of the Terminal

## Design and Usability Decisions

The mobile application design implements a simple yet clean design to display information clearly to the user with a nested doll approach combined with the use of side-menus. The mobile app runs natively on device to reflect the traditional styles of both iOS and android. Steps have been taken to reduce user input and taps as much as possible to make an order. The design principles of reducing scrolling, expand for more and the use of loading indicators in prevelant thoroughout the app. Orientation is also restricted to portrait only.

## Styling Decisions
ESLint

## Available Scripts
### `npm install`
Installs dependencies needed to run the app
### `npm start`
Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.<br>
*NOTE:* You must have an instance of the GraphQL server running, connected to a DB containing at least a bar, collection point and bartender setup to use the terminal.
## Tests and Test Strategy
## Organisation of Code
Josh (pls ask Dan)




<br/>
<br/>
<br/>

## Supported Accessibility
## Tech/framework used
## Design and Usability Decisions
## Features
- [x] Sample feature

## Styling Decisions
## Available Scripts
## Tests and Test Strategy
## Organisation of Code






<br/>
<br/>
<br/>

## Installed Packages

 - [Apollo Client](https://electron.atom.io)
 - [axios](https://github.com/axios/axios)
 - [graphql-tag](https://electron.atom.io)
 - [React-Native-Animatible](https://github.com/felixge/node-dateformat)
  - [R](https://github.com/pubnub/eon)
 - [Nodemailer](https://electron.atom.io)
  - [Nodemon](https://github.com/remy/nodemon)
  - [PropTypes](https://electron.atom.io)
  - [React-App-Rewired](https://github.com/timarney/react-app-rewired)
 - [React-Redux](https://github.com/reduxjs/react-redux/)
 - [React-Router-Dom](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/api/Link.md)
 - [React a11y](https://github.com/reactjs/react-a11y)
  - [React Chart JS 2](https://github.com/jerairrest/react-chartjs-2)
  - [ReduxSaga](https://github.com/redux-saga/redux-saga)
  - [Redux Thunk](https://github.com/reduxjs/redux-thunk)
 - [Redux](https://redux.js.org/)
 - [Socket.io](https://socket.io/)
 - [Socket.io-client](https://socket.io/)

## Plans for expanding the project
- Login by bar
- Ingredients, including stock management and queuing by ingredients
- API protection
- Customer ratings
- Loyalty Schemes 
- Possible Gamification features to promote loyalty and rewards 

## Licensing restrictions
- Apple Pay
- AppStore deployment
- Apple remote notifications
- Stripe customer support

## Links
- [Taiga](https://taiga.cs.cf.ac.uk/project/c1632962-drinks-ordering-app)
- [Mongo Alias](https://cloud.mongodb.com/v2/5c5996d8ff7a25e136324f18#clusters/detail/DrinksApp)

## References
- [Noble ordering app](https://getnoble.co)
- [React](https://reactjs.org/)
