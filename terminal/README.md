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
- [ ] Stock management backend - **BLOCKED:** *No schema table for ingredients*
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
### Pop Ups
In an effort to keep all main features one tap away, the terminal never reloads or redirects to other pages. All sub-menus and options are compacted cleanly away behind our highly-configurable modal component we refer to as “popups”.

### Account Switching
To avoid managers having to constantly re-assign shifts to get staff to display on-screen for the correct hours, we opted to always display all staff members! Bartenders can instantly switch between their cached active orders via our hotbar at the top of the terminal. This hotbar shows as many staff members that fit on screen width-ways as possible (on an iPads, this is usually 5-10 depending on orientation). If a bartender is not on-screen, they can access their account from the ‘More accounts’ button/popup. Switching accounts via the more accounts window also bumps the staff member to the front of the hotbar for the given terminal. This means the hotbar quickly self-manages active staff, and so long as the bar provides enough terminals (at least 1 for every 5 staff), all staff will fit on-screen.

- Icons
- Notifications

### Usability decisions
- Everything in one view
- Perform tasks in the least possible taps
- Ensure the colour scheme of the terminal is align with the company logo

## Available scripts
### `npm install`
Installs dependencies needed to run the app
### `npm start`
Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.<br>
*NOTE:* You must have an instance of the GraphQL server running, connected to a DB containing at least a bar, collection point and bartender setup to use the terminal.
## Tests and Test Strategy
## Organisation of Code
Josh (pls ask Dan)
