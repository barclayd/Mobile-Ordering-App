import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import PopupWindow from '../../containers/popup-window/popup-window';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faBan } from '@fortawesome/free-solid-svg-icons';

const OutOfStockPopUpWindow = props => {

    const buildIngredients = (ingredients) => { // Check item contains more ingredients than just itself

        if (ingredients.length > 1) {
            return (
                <ul className="ingredientList">
                    {
                        ingredients.map((ingredientData, incrementer) => {
                            return (
                                <li key={incrementer} className="item">{ingredientData.name}</li>
                            )
                        })
                    }
                </ul>
            )
        }
    };

    const buildChildren = (order) => {
        if (order) return (
            <React.Fragment>
                <div className="indentedContent">
                    <ul className="orderList">
                        {order.items.map((itemData, incrementer) => {
                            return (
                                <li key={incrementer}>
                                    <span className="item">{itemData.name}</span>
                                    { buildIngredients(itemData.ingredients) }
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </React.Fragment>
        ); else return "";
    };

    const buildButtons = () => {
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
    };

       return (
            <PopupWindow
                    className="outofStockPopup"
                    title="OUT OF STOCK:"
                    subtitle={<span>Tap items or ingredients to mark out of stock</span>}
                    showCloseButton={true}
                    showFunc={props.showFunc}
                    buttons={buildButtons()}
            >
                { buildChildren(props.order) }
            </PopupWindow>
        )
};

OutOfStockPopUpWindow.propTypes = {
    order: PropTypes.object,
    showFunc: PropTypes.func.isRequired, // Callback function held in parent that calls popup window instance's ShowPopup()
};

export default OutOfStockPopUpWindow;
