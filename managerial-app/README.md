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

### Set Up Page
Uses JS buttons that load data from a hardcoded source, if required in future to get data from the server
it wouldn't require much work. Clear and clean interface that is familiar for many managers who would be 
using the application.

### Menu edit Page
Uses the material design. Improves accessibility, and is a clear interface that is familiar to users. 

### Statistics Page
Uses FusionCharts which has a very attractive interface, and very accessible.

## How to run
### Installing dependencies
* Ensure [npm](https://www.npmjs.com/get-npm) and [git bash](https://gitforwindows.org/) are installed on your computer.
* Ensure the GraphQL server is setup and running (checkout our install guide [here](https://gitlab.cs.cf.ac.uk/c1673342/drinks-app/blob/master/server/README.md)).
**NOTE:** The database MUST contain at least one bar, collection point and bartender to use with the managerial app, especially if you want to view the data.
* `git clone` or download and unzip this repository to your computer
* Open a Git bash window inside the managerial folder and install dependencies using `npm install`

### Running and using the app
* Open a terminal (CMD or git bash) window inside the manager (customiser) folder
* Run `npm start` command to run an instance of the project
* Connect to [localhost:3000](http://localhost:3026) in a web browser to view the app on a webpage.




