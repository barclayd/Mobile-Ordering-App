import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './style.css'
import PopupWindow from '../popup-window/popup-window'
import TimeAgo from '../time-ago-clean/time-ago-clean'
import { DateTime } from 'luxon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArchive, faTrashAlt, faGlassCheers } from '@fortawesome/free-solid-svg-icons';

class PickupPopupWindow extends Component {

    showOutOfStock = () => {
        this.state.showOutOfStock()
    };

    buildButtons = () => {
        return (
            <div className="popupButtonsContainer">
                <button className="orderButton">
                    <span className="icon complete"><FontAwesomeIcon icon={faGlassCheers} /></span>
                    <span className="title">Completed</span>
                    <br />
                    <span className="subtitle">Mark as completed</span>
                </button>
                <button className="orderButton">
                    <span className="icon refund"></span>
                    <span className="title">Refund</span>
                    <br />
                    <span className="subtitle">Mark as un-ready</span>
                </button>
                <button onClick={this.props.showOutOfStock} className="orderButton">
                    <span className="icon outOfStock"><FontAwesomeIcon icon={faArchive} /></span>
                    <span className="title">Out of Stock</span>
                    <br />
                    <span className="subtitle">Mark unavailable</span>
                </button>
                <button className="orderButton">
                    <span className="icon delete"><FontAwesomeIcon icon={faTrashAlt} /></span>
                    <span className="title">Delete</span>
                    <br />
                    <span className="subtitle">Cancel &amp; charge</span>
                </button>
            </div>
        )
    };

    buildTitle = (order) => {
        if (order) return "#" + order.collectionId + " pickup"; else return "";
    };

    // Time formatting with Luxon: https://moment.github.io/luxon/docs/manual/formatting.html#table-of-tokens
    buildSubtitle = (order) => {
        if (order) return (
            <span>
                Ordered <TimeAgo date={order.date}/>, at {DateTime.fromJSDate(order.date).toFormat("h:mma")}
            </span>
        ); else return (<span></span>);
    };

    // Only shows customer notes if some exist
    buildNotes = (customerNotes) => {
        if (customerNotes) return (
            <React.Fragment>
                <h2>Customer notes:</h2>
                <p className="indentedPara notesPara">{ customerNotes }</p>
            </React.Fragment>
        ); else return ""
    };

    buildChildren = (order) => {
        if (order) return (
            <React.Fragment>
                <h1>DRINKS:</h1>
                <div className="indentedContent">
                    <ul className="orderList">
                        {order.drinks.map((itemData, counter) => {
                            return (
                                <li key={counter}>
                                    <span className="quantity">{itemData.quantity}</span>
                                    <span className="item">{itemData.name}</span>
                                </li>
                            )
                        })}
                    </ul>

                    { this.buildNotes(order.notes) }
                </div>
            </React.Fragment>
        ); else return "";
    };

    render () {
        return (
            <PopupWindow
                    className="pickupPopup"
                    title={this.buildTitle(this.props.order)}
                    subtitle={this.buildSubtitle(this.props.order)}
                    showCloseButton={true}
                    showFunc={this.props.showFunc}
                    dismissedHandler={this.props.dismissedHandler}
                    buttons={this.buildButtons()}
            >
                { this.buildChildren(this.props.order) }
            </PopupWindow>
        )
    }
}

PickupPopupWindow.propTypes = {
    order: PropTypes.object,
    showFunc: PropTypes.func.isRequired, // Callback function held in parent that calls popup window instance's ShowPopup()
    showOutOfStock: PropTypes.func.isRequired, // Function to show out of stock window
    dismissedHandler: PropTypes.func.isRequired, // Function ran when billing popup is closed without action
};

export default PickupPopupWindow;
