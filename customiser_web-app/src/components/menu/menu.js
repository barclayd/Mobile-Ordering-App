import React, {component} from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

export default class Menu extends Component {
  state = { //hardcoded for now
    data: [
      {
        name: "Beer",
        category: "Beer",
        nutritionInfo: "102 Kcal",
        price: "1.99"
      },
      {
        name: "Shiraz",
        category: "Wines",
        nutritionInfo: "500 Kcal",
        price: "4.99"
      },
      {
        name: "Vodka",
        category: "Spirits",
        nutritionInfo: "800 Kcal",
        price: "3.99"
      }
    ]
  }
}

export default Menu;