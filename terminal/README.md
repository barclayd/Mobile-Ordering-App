# Drin*King* - Bartender terminal :computer:  [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
The Terminal web-app allows bar staff to view and manage orders. Terminals operate for set collection points in an establishment. Multiple terminals can be setup for single collection points. Staff members can work from any terminal, with the option to share terminals with colleagues.
<br>
We opted to use web-app architecture since all the appropriate hardware (webcams, touch-input etc) is still accessible with simple Javascript. Using web development meant the terminal has cross-platform support, doesn’t require app certificates and is easy to load onto any modern device.
<br>
The terminal communicates with the DrinKing mobile-app through use of the Node.js server via HTTP requests for data requests and websockets for real time data.

## Supported Accessibility
* **Hotkeys** - Escape key can be pressed at any time to dismiss the top-most popup window
* **Colour scheme** - The Terminal colour scheme reflects the company logo. The dark also scheme increases visibility for dark bar environments with extended viewing time
* **Colourblind support** - All UI colours have been tailored to reduce common difficulties for colourblind users. Additionally, all buttons, icons and popups have names and descriptions to prevent any confusion for bartenders with site problems.
* **Tap to close popups** - Tapping outside any active popup dismisses them
* **Tap to dismiss notifications** - Notifications either automatically timeout or can be forcefully dismissed early with a single tap
* **Tap to compact UI** - if too many awaiting orders are on screen, bartenders can tap to collapse them into one iOS styled group.
* **No redirecting** - In an effort to keep every main feature just a tap away, the terminal never reloads or redirects to other pages. All sub-menus, options and features are compacted cleanly behind our highly-configurable modal component we refer to as “popups”. This reduces time to complete actions and user frustration as all on-screen data is always up to date. The UI is both functional and minimal.

## Tech/framework used
* Website framework - Create-Reac-App
* State Management – Redux and Redux Saga
* Caching user-settings - React LocalStorage
* GraphQL client - Apollo Client
* HTTP Client - axios
* Real-time data transfer - GraphQL subscriptions
* Development: React Debugger
* Payment handler/Stripe client: Tipsi-stripe
* Testing: Jest
* SVG icons - FontAwesome
* Clean date formatting - TimeAgo.js & Luxon

## Installed packages
* `@fortawesome/fontawesome-svg-core`
* `@fortawesome/free-regular-svg-icons`
* `@fortawesome/free-solid-svg-icons`
* `@fortawesome/react-fontawesome`
* `apollo-cache-inmemory`
* `apollo-client`
* `apollo-link`
* `apollo-link-http`
* `apollo-link-ws`
* `apollo-utilities`
* `axios`
* `graphql`
* `graphql-tag`
* `immutability-helper`
* `luxon`
* `prop-types`
* `react`
* `react-apollo`
* `react-dom`
* `react-qr-reader`
* `react-redux`
* `react-scripts`
* `redux`
* `redux-saga`
* `subscriptions-transport-ws`
* `timeago.js`




## Features
- [x] All features one tap away. Using ajax communication, the page is never redirected or reloaded.
- [x] Stock management UI, allowing individual ingredients and drinks to be marked out of stock
- [ ] Stock management backend - **BLOCKED:** *No schema table for ingredients*
- [x] Staff management & easy staff account switching
- [x] Intelligent queuing algorithm
- [x] Hotbar to switch staff members, dynamically showing as many as possible on-screen in one line
- [x] Hotbar of staff members is sorted by most recent login from switch accounts window to avoid the need to manually configure staff shifts
- [x] Staff can mark orders as awaiting pickup, cancelled, refunded or complete (upon pickup)
- [x] Feed of in-progress orders showing only those assigned/taken to the logged in bartender
- [x] Feed of orders awaiting collection for the collection point, shown to all staff using terminals at the given collection point
- [x] Toggleable collapsing of awaiting orders feed to keep UI clean
- [x] Webcam scanner to let customers use QR codes in their receipt to authenticate themselves at the collection point and pickup their order
- [x] Webcam scanner preview to test camera quality
- [x] Non-dismissible popup to change collection point for terminal
- [x] Switch accounts popup (adds switched account to hotbar)
- [x] Manual order pickup (by order code on receipt, as failsafe for scan fails) & upcoming orders popup (shows feed of unassigned pending orders)
- [x] Billing popup (allows stock management, viewing of items & prices, refunding and cancellation) and pickup popup (shown when a QR is scanned or entered manually, allows marking as completed/collected and all other billing options)
- [x] Animated notifications for errors, successes, information and warnings. Used for new orders, completing orders, scan fails, collection point switching and more
- [x] Detailed loading screen showing API loading stage
- [x] Placeholder UI for when no in-progress or awaiting collection orders are active to explain each region of the Terminal
- [x] Last staff and collection point used is automatically saved on the terminal client so page reloads don’t effect which orders are shown
- [x] All active orders are cached on each terminal; when staff switch accounts, they don’t have to wait for orders to pull down from the server. Additionally, the intelligent queuing algorithm can run responsively client-side, reducing server CPU load and increasing responsiveness of taking on new orders.
- [x] New orders are instantly added to the terminal’s state, notifying the staff


## Major Design and Usability Decisions
### Account Switching
To avoid managers having to constantly re-assign shifts to get staff to display on-screen for the correct hours, we opted to always display all staff members! Bartenders can instantly switch between their cached active orders via our hotbar at the top of the terminal. This hotbar shows as many staff members that fit on screen width-ways as possible (on an iPads, this is usually 5-10 depending on orientation). If a bartender is not on-screen, they can access their account from the ‘More accounts’ button/popup.
<br>
Switching accounts via the more accounts window also bumps the staff member to the front of the hotbar for the given terminal. This means the hotbar quickly self-manages active staff, and so long as the bar provides enough terminals (at least 1 for every 5 staff), all staff will fit on-screen.
<br>
Staff may favouritise a single terminal of many operating under the same collection point. For this reason, we did not want the prioritised hotbar order syncing with the DB across terminals, since it’d cause constant jumps when staff have to re-assign their position on the bar. Instead, the hotbar order is stored locally on each terminal they login to.

### Intelligent queuing algorithm
When a bartender taps to take new orders, our intelligent queuing algorithm analyses upcoming orders before assigning any. The first order will always be taken, to ensure that no matter what you order, you will never have to wait too long to be served. The algorithm then studies each drink in the next 4 orders after, counting matches and differences. The selection of orders with matches are then sorted by number of matches (most to least) and then by number of differences (least to most). If an order is found to meet the threshold for matches (as a percentage) then the orders are pulled into the bartender’s feed together. This enables bar staff to efficiently work on multiple orders at once.
<br>
At present, a maximum of 3 orders can be taken at once. This prevents bar staff from being overloaded. Only the top 4 orders are studied to ensure that the queue mostly operates under a fair first-in first-out style.
<br>
Matching and assigning similar orders drastically improves production time, since bartenders can make all identical drinks at once, reducing trips back and forth to the bar.

### Stock management system
One requirement for DrinKing was the ability to mark drinks & ingredients out of stock, to prevent further orders of unavaliable items. After investigating many bars and questioning bartenders, we often found bars never manage stock on-the-go. Stock is pre-purchased, estimating 
consumption from past events. Bartenders do not have the time to manage stock live.
<br>
When considering a live stock management system via DrinKing, we also discussed the limitation that not all orders will be managed through our terminal - most customers will still use the bar. This means sales aren’t a reliable method of automating stock management.
<br>
We decided on adding a stock manager button to each in-progress and awaiting collection order. This can be used on-the-fly to mark single ingredients and drinks out of stock for live orders. This would then alert the buyer, and all customers with the same items in their pending orders to either edit or cancel their order. This also enables the client-app to disable future purchasing of the item, until marked as in-stock.

### QR encryption
After many debates with the team, we decided on having QR codes encoded in plain text. QR codes simply hold the human-readable convientiant 4 character order code.
<br>
This data, if scanned, is not at all sensitive to the user. Additionally, it already has to be displayed on-screen beside the QR on the receipt in case of automatic scan fails.
<br>
Following the trend of big-brands including KFC, Slim Chickens & many more and opting to not encrypt the QR meant that the QR was very simple and could be hugely enlarged. This not only reduces scan time, but it also drastically improves scan range and reliability.
It could be argued that “scannable” QR codes are easier to forge. However, had we encrypted them, customers could similarly just duplicate existing encrypted codes to make fraudulent receipts scan.
<br>
To counter this, we ensured notifications show to alert staff about invalid order codes, expired codes, codes used for orders not yet ready for collection and QR codes that aren’t following the legitimate DrinKing format.
<br>
We also implemented a cooldown feature to prevent rapid-QR readings. This means that if a customer developed an app to brute-force guess order codes, they’d only be able to retry 1 failed attempt every 3 seconds.
<br>
The probability of a malicious user ever being able to guess a 4 character existing order code for an order sent to that bar, to that collection point and have it awaiting collection is near impossible.


### Creating custom popups
Popups are created using our custom `popup-window.js` component. This window automatically implements a click-able shadow overlay, close hotkeys, a formatted title, subtitle and body and some other CSS stylings for common HTML elements such as H1, H2 and P blocks.
<br>
To configure your popup window, you must pass in parameters called “props”. Required props must always be passed in. Popups contain the following options:
```javascript
className: PropTypes.string.isRequired, // Auto-assigned CSS class to popup’s children container, enabling easy styling without affecting the rest of the app
showCloseButton: PropTypes.bool.isRequired, // Bool to enable or disable close buttons & hotkeys
showFunc: PropTypes.func.isRequired, // Callback function held in parent that calls popup window instance's ShowPopup() to display the popup
title: PropTypes.string.isRequired, // String to be loaded as the popup’s title
subtitle: PropTypes.object.isRequired, // JSX object used for the subtitle, supporting custom elements such as styled spans
children: PropTypes.node.isRequired, // JSX object holding the body of the popup
dismissedHandler: PropTypes.func, // A callback function, fired automatically when the popup is closed
closePopup: PropTypes.bool, // Variable used to close the window. If set to true, the popup will instantly close
buttons: PropTypes.object // JSX object containing any buttons to show at the bottom of the popup
```
For an example on a closeable popup with buttons, a dismiss handler see [pickup-popup-window.js](https://gitlab.cs.cf.ac.uk/c1673342/drinks-app/blob/master/terminal/src/containers/pickup-popup-window/pickup-popup-window.js).
<br>
For an example on a popup that cannot be dismissed without selecting an option first, see [select-collection-point-popup-window.js](https://gitlab.cs.cf.ac.uk/c1673342/drinks-app/blob/master/terminal/src/containers/select-collection-point-popup-window/select-collection-point-popup-window.js).

## How to run
### Installing dependencies
* Ensure [npm](https://www.npmjs.com/get-npm) and [git bash](https://gitforwindows.org/) are installed on your computer.
* Ensure the GraphQL server is setup and running (checkout our install guide [here](https://gitlab.cs.cf.ac.uk/c1673342/drinks-app/blob/master/server/README.md)).
**NOTE:** The database MUST contain at least one bar, collection point and bartender to use with the terminal.
* `git clone` or download and unzip this repository to your computer
* Open a Git bash window inside the project’s *terminal* folder and install dependencies using `npm install`

### Running and using the app
* Open a terminal (CMD or git bash) window inside the *terminal* folder
* Run `npm start` command to run an instance of the project
* Connect to [localhost:3000](http://localhost:3006) in a web browser to view the terminal on your computer
* Connect to **\<your-computer-IP\>**:3006 to view the terminal on other devices on the LAN


# Plans for expanding the project
* Secure login by bar
* Welsh language support


# Current limitations of Solution
* Enabling stock management and queue-sorting by ingredients to match similarly made drinks; blocked by lack of schema ingredients support


## Tests and Test Strategy
Our range of automated tests can be ran using `npm test`. It is highly recommended to perform this check after making any changes to the terminal to validate code quality.


## Organisation of Code
The terminal frontend is structured using best practise methods. Components hold all stateless, functional components used in the project whereas containers hold all stateful, class based components. Store hold all actions, reducers and sagas used within the implementation of advanced Redux in the project.
