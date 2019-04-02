import React, {component} from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Table from "./table";

class Menu extends React.Component {
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
  handleRemove = i => {
    this.setState(state => ({
      data: state.data.filter((row, j) => j !== i)
    }));
  };

  startEditing = i => {
    this.setState({ editIdx: i });
  };

  stopEditing = () => {
    this.setState({ editIdx: -1 });
  };

  handleSave = (i, x) => {
    this.setState(state => ({
      data: state.data.map((row, j) => (j === i ? x : row))
    }));
    this.stopEditing();
  };
  
  render() {
    return (
      <MuiThemeProvider>
        <div className="Menu">
          <Table
            handleRemove={this.handleRemove}
            startEditing={this.startEditing}
            editIdx={this.state.editIdx}
            stopEditing={this.stopEditing}
            handleSave={this.handleSave}
            data={this.state.data}

            header={[
              {
                name: "Name",
                prop: "name"
              },
              {
                name: "Category",
                prop: "category"
              },
              {
                name: "Nutrition Info",
                prop: "nutritionInfo"
              },
              {
                name: "Price",
                prop: "price"
              }
            ]}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Menu;