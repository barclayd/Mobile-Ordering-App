import React, {component} from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { connect } from "react-redux";
import Table from "./table";
import * as actions from "../../store/actions";

class Menu extends React.Component {
  state = {
    drinks: [],
    drinksApi: false,
  };

  componentDidMount() {
    this.props.onFetchDrinkCategories();
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading) {
      this.setState({
        drinks: nextProps.drinks
      });
    }
  }

  getDrinksByCategory = (id) => {
    const categoryName = this.state.categories[id];
    return this.state.drinks.filter(drink => drink.category === categoryName);
  };

  handleRemove = i => {
    this.setState(state => ({
      data: this.state.drinks.filter((row, j) => j !== i)
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
      data: this.state.drinks.map((row, j) => (j === i ? x : row))
    }));
    this.stopEditing();
  };

  render() {
    let tableData = null;
    if(this.props.drinks.length > 0) {
      tableData = this.props.drinks.map((category, index) => {
        return (<MuiThemeProvider tabLabel={category} key={index}>
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
        </MuiThemeProvider>)
    })
    }
    return (
     <div>{ this.props.drinks.length > 0 ? tableData : <React.Fragment/> }</div>
    )
  }
}

const mapStateToProps = state => {
  return {
    drinkCategories: state.drinks.categories,
    drinks: state.drinks.drinks,
    loading:state.drinks.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchDrinkCategories: () => dispatch(actions.findDrinks()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);