# DrinKing - Bar Managerial Application:
The Managerial application allows Bar Managers/Owners to view/edit menus, view statistics from orders and answer questionnaires about their bar.

## Supported Accessibility
* **Hierarchy** - Clearly visible elements with sufficient contrast and size.
* **Focus Order** - Most important information is shown clearly and largely. Background colour isn't as important as with the terminal application; colour is kept in for app consistency.
* **Colourblind support** - All UI colours have been tailored to reduce common difficulties for colourblind users.
* **Contrast ratios** - For buttons, contrast ratios were considered, having a slight grey on light blue for the set up questions seemed to work.
* **Icons** - Icons are clear, and are imported from google's material UI design. These are going to be familiar to users. The spacing is also suitable.
* **Typography** - Fonts are large and clear, using Roboto it is familiar and readable.

## Tech/framework used
- NodeJS
- React (create-react-app)
- Redux
- React Router
- FusionCharts

## Installed packages
* `@axios`
* `@fusioncharts`
* `@luxon`
* `@material-ui`
* `@node-sass`
* `@prop-types`
* `@react`
* `@react-dom`
* `@react-fusioncharts`
* `@react-mdl`
* `@react-redux`
* `@react-router-dom`
* `@react-scripts`
* `@react-timeago`
* `@redux`
* `@redux-saga`

## Features
- [x] Show main page describing features on managerial website
- [x] Set Up option.
- [x] Logic to handle setting up the account.
- [x] Questions for the user.
- [x] View a list of drinks as a JSON.
- [x] Format the drinks as a table using material UI.
- [x] Be able to get drinks from the server.
- [x] Be able to edit drinks locally.
- [ ] Be able to edit drinks using server. **BLOCKED:** *No code in server to handle edit.*
- [x] Be able to handleDelete locally.
- [ ] Be able to delete drinks using api call. **BLOCKED:** *No code in server to handle delete.*
- [x] Integrate FusionCharts into the application.
- [x] Get a bar chart to show mock data for two collection points.
- [x] Get order from the server to show real data on the bar chart.

## Major Design and Usability Decisions

