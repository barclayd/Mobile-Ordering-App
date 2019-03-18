import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import PopupWindow from '../popup-window/popup-window'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faBan } from '@fortawesome/free-solid-svg-icons';

export default class OutOfStockPopUpWindow extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            outOfStockIngredients: []
            //EXAMPLE: outOfStockIngredients: [{id: 0, inStock: true}]
        }
    }

    markIngredientOutOfStock = (ingredientID) => {
        this.setState((prevState) => {

            // check the original stock value in case the user has already marked the item in/out of stock
            let currentStock = prevState.outOfStockIngredients.findIndex(ingredient => ingredient.id === ingredientID);
            
            let newOutOfStockIngredients = this.state.outOfStockIngredients; // copy array
            if (currentStock !== -1) {
                let oldInStock = prevState.outOfStockIngredients[currentStock].inStock; // find original value
                newOutOfStockIngredients[currentStock].inStock = !oldInStock; // change stock value
                
            } else {
                newOutOfStockIngredients.push({id: ingredientID, inStock: false}); // add new stock value to array
            }
            
            return { outOfStockIngredients: newOutOfStockIngredients} // Update state for saving to server
        }, ()=>{ console.log(this.state.outOfStockIngredients) })
    }

    buildIngredients = (ingredients) => { // Check item contains more ingredients than just itself
        if (ingredients.length > 1) {
            return (
                <ul className="ingredientList">
                    {
                        ingredients.map((ingredientData, incrementer) => {
                            return (
                                <li
                                    onClick={ () => { this.markIngredientOutOfStock(ingredientData.id) } }
                                    key={ incrementer }
                                    className="item outOfStock"
                                >
                                    { ingredientData.name }
                                </li>
                            )
                        })
                    }
                </ul>
            )
        }
    }
    buildChildren = (order) => {
        if (order) return (
            <React.Fragment>
                <div className="indentedContent">
                    <ul className="orderList">
                        {order.items.map((itemData, incrementer) => {
                            return (
                                <li key={incrementer}>
                                    <span className="item">{itemData.name}</span>
                                    { this.buildIngredients(itemData.ingredients) }
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </React.Fragment>
        ); else return "";
    }

    buildButtons = () => {
        return (
            <div className="popupButtonsContainer">
                <button className="orderButton">
                    <span className="icon save"><FontAwesomeIcon icon={faSave} /></span>
                    <span className="title">Save</span>
                    <br />
                    <span className="subtitle">Notify customers</span>
                </button>

                <button className="orderButton">
                    <span className="icon cancel"><FontAwesomeIcon icon={faBan} /></span>
                    <span className="title">Cancel</span>
                    <br />
                    <span className="subtitle">Revert changes</span>
                </button>
            </div>
        )
    }

    render () {
       return (
            <PopupWindow
                    className="outofStockPopup"
                    title="OUT OF STOCK:"
                    subtitle={<span>Tap items or ingredients to mark out of stock</span>}
                    showCloseButton={true}
                    showFunc={this.props.showFunc}
                    buttons={ this.buildButtons() }
            >
                { this.buildChildren(this.props.order) }
            </PopupWindow>
        )
    }
}

OutOfStockPopUpWindow.propTypes = {
    order: PropTypes.object,
    showFunc: PropTypes.func.isRequired, // Callback function held in parent that calls popup window instance's ShowPopup()
}