# Drin*King* - The drinks ordering app :beers:
## Motivation
Age old problem of lengthy and unfair queues at bars or other establishments. 
Opportunity as our development team is located in Cardiff with a wealth of students and bars.
Problem is identified and backed by each member, therefore, we support the decision to commit
Ourselves to develop our drinking solution.

## Code style
We used React & React Native's baked-in ESLint scripts to ensure all teammates
wrote code following a specific syntax and style.

This kept code consistent and readable for all team members and will help new 
potential future devs picking up the project.

## System Architecture

We are using a Mongo database defined and queried using GraphQL. Our customer react-native Android / iOS App communicates to our database through a Node Js server. We are receiving live data changes by use of GraphQL subscriptions, enabled using an Apollo client.


![51801019_289983681694391_8594841858423652352_n](/uploads/642f2bacf40070ed1c766db3285233df/51801019_289983681694391_8594841858423652352_n.png)


<br/>
<br/>
<br/>

# GraphQL server
## Tech/framework used
* Frontend library - ReactNative

## Design and Usability Decisions

##Schema visual
<img width="800" alt="Database Models and Schema" src="https://user-images.githubusercontent.com/39765499/53703777-babdab00-3e0d-11e9-8f45-136b54e106a8.png">

## Features
- [x] Sample feature

## Available Scripts
## Tests and Test Strategy

## Organisation of Code






<br/>
<br/>
<br/>

# Customer iOS & Android app
## Supported Accessibility

## Tech/framework used

## Design and Usability Decisions

As a team, we opted for an unencrypted QR code. Following on from large entities such as KFC and McDonalds.
The decision was taken to allow our users to scan their codes faster and more reliably with an unencrypted QR code.
The information which can be seen from scanning another user’s QR code is simply what would be shown on a physical receipt, that being their order number. 
Our response to this is warning the user as to not share their QR codes with other users.

Our mobile App uses react-navigation-v2. (https://github.com/wix/react-native-navigation/tree/v2)
This decision was taken to provide our users with ergonomic screen layouts and navigation links such as our intuitive side drawer and centre stack screen which screens can be pushed on top of.


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

## Styling Decisions
## Available Scripts
## Tests and Test Strategy
## Organisation of Code

<br/>
<br/>
<br/>



# Bartender terminal
The Terminal web-app allows bar staff to view and manage orders. Terminals operate for set collection points in an establishment. Multiple terminals can be setup for single collection points. Staff members can work from any terminal, with the option to share terminals with colleagues.

## Supported Accessibility
Josh
## Tech/framework used
- NodeJS
- React
- Redux
- FontAwesome
- TimeAgo & Luxon

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
Josh pls add features
## Design and Usability Decisions
Bar Staff Terminal Key Design Decisions
Account Switching (uses a sorting logic via an intelligent algorithm, pushes new member to the front)
Pop Ups
Icons
Notifications

Usability Bar Staff Terminal
Everything in one view
Perform tasks in the least possible taps
Ensure the colour scheme of the terminal is align with the company logo
Freddie
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

# Managerial website
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

# Conclusion
Sample text
Guy

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