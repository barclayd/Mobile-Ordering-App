import React, {component} from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { connect } from "react-redux";
import Table from "./table";
import TabbedCategories from "../../../../mobile/src/screens/ViewDrinks/ViewDrinks";
import * as actions from "../../../../mobile/src/store/actions";

class Menu extends React.Component {
    state = {
      drinks: [],
      drinksApi: false,
    };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading) {
      const selectedMenu = nextProps.menus.filter(menu => menu._id === this.props.menuId);
      this.setState({
        drinks: selectedMenu[0].drinks
      });
    }
  }

  getDrinksByCategory = (id) => {
    const categoryName = this.state.categories[id];
    return this.state.drinks.filter(drink => drink.category === categoryName);
  };

  // state = { //hardcoded for now
  //   data: [
  //     {
  //       name: "Beer",
  //       category: "Beer",
  //       nutritionInfo: "102 Kcal",
  //       price: "1.99"
  //     },
  //     {
  //       name: "Shiraz",
  //       category: "Wines",
  //       nutritionInfo: "500 Kcal",
  //       price: "4.99"
  //     },
  //     {
  //       name: "Vodka",
  //       category: "Spirits",
  //       nutritionInfo: "800 Kcal",
  //       price: "3.99"
  //     }
  //   ]
  // }
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
     // <MuiThemeProvider tabLabel={category} key={index}>
      //  <TabbedCategories
       //   key={category}
       //   category={category}
       //   drinks={this.getDrinksByCategory(index)}
       // />
      //</MuiThemeProvider>
      {this.state.categories.length > 0 ? (
          <MuiThemeProvider tabLabel={category} key={index}>
            <div className="Menu">
              <Table
                handleRemove={this.handleRemove}
                startEditing={this.startEditing}
                editIdx={this.state.editIdx}
                stopEditing={this.stopEditing}
                handleSave={this.handleSave}
                data={this.props.drinks}

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
        ) : null}

    );
  }
}

const mapStateToProps = state => {
  return {
    drinkCategories: state.drink.categories,
    drinks: state.drinks.drinks(),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchDrinkCategories: () => dispatch(actions.findDrinks()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);