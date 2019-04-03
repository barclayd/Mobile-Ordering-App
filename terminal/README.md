# Drin*King* - Bartender terminal :computer:
The Terminal web-app allows bar staff to view and manage orders. Terminals operate for set collection points in an establishment. Multiple terminals can be setup for single collection points. Staff members can work from any terminal, with the option to share terminals with colleagues.

## Supported Accessibility
* **Hotkeys** - Escape key can be pressed at any time to dismiss the top-most popup window
* **Colour scheme** - The Terminal colour scheme reflects the company logo. The dark also scheme increases visibility for dark bar environments with extended viewing time
* **Colourblind support** - All UI colours have been tailored to reduce common difficulties for colourblind users. Additionally, all buttons, icons and popups have names and descriptions to prevent any confusion for bartenders with site problems.
* **Tap to close popups** - Tapping outside any active popup dismisses them
* **Tap to dismiss notifications** - Notifications either automatically timeout or can be forcefully dismissed early with a single tap
* **Tap to compact UI** - if too many awaiting orders are on screen, bartenders can tap to collapse them into one iOS styled group.
* **No redirecting** - In an effort to keep every main feature just a tap away, the terminal never reloads or redirects to other pages. All sub-menus, options and features are compacted cleanly behind our highly-configurable modal component we refer to as “popups”. This reduces time to complete actions and user frustration as all on-screen data is always up to date. The UI is both functional and minimal.

## Tech/framework used
- NodeJS
- React (create-react-app)
- Redux
- FontAwesome
- TimeAgo & Luxon

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
- [x] Intelligent queuing algorithm that studies upcoming orders to match and pull similar orders together to help bar staff efficiently complete multiple orders at once
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
#**Josh pls add features**

## Major Design and Usability Decisions
### Account Switching
To avoid managers having to constantly re-assign shifts to get staff to display on-screen for the correct hours, we opted to always display all staff members! Bartenders can instantly switch between their cached active orders via our hotbar at the top of the terminal. This hotbar shows as many staff members that fit on screen width-ways as possible (on an iPads, this is usually 5-10 depending on orientation). If a bartender is not on-screen, they can access their account from the ‘More accounts’ button/popup.
<br>
Switching accounts via the more accounts window also bumps the staff member to the front of the hotbar for the given terminal. This means the hotbar quickly self-manages active staff, and so long as the bar provides enough terminals (at least 1 for every 5 staff), all staff will fit on-screen.
<br>
Staff may favouritise a single terminal of many operating under the same collection point. For this reason, we did not want the prioritised hotbar order syncing with the DB across terminals, since it’d cause constant jumps when staff have to re-assign their position on the bar. Instead, the hotbar order is stored locally on each terminal they login to.

### Queuing alogirthm




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


## Tests and Test Strategy


## Organisation of Code
The terminal frontend is structured using best practise methods. Components hold all stateless, functional components used in the project whereas containers hold all stateful, class based components. Store hold all actions, reducers and sagas used within the implementation of advanced Redux in the project.
