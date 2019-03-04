import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import PopupWindow from '../popup-window/popup-window'
import TimeAgo from '../time-ago-clean/time-ago-clean'
import { DateTime } from 'luxon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArchive, faTrashAlt, faGlassCheers } from '@fortawesome/free-solid-svg-icons';

export default class PickupPopupWindow extends React.Component {
    buildTitle = (order) => {
        if (order) return "#" + order.id + " pickup"; else return "";
    }

    // Time formatting with Luxon: https://moment.github.io/luxon/docs/manual/formatting.html#table-of-tokens
    buildSubtitle = (order) => {
        if (order) return (
            <span>
                Ordered <TimeAgo date={order.orderDate}/>, at {DateTime.fromJSDate(order.orderDate).toFormat("h:mma")}
            </span>
        ); else return (<span></span>);
    }

    render () {
        return (
            <PopupWindow
                    className="pickup"
                    title={this.buildTitle(this.props.order)}
                    subtitle={this.buildSubtitle(this.props.order)}
                    showCloseButton={true}
                    showFunc={this.props.showFunc}
                    dismissedHandler={this.props.dismissedHandler}
            >
                <h1>DRINKS:</h1>
                <div className="indentedContent">
                    <ul className="orderList">
                        <li><span className="quantity">4x</span>VK Orange</li>
                        <li><span className="quantity">1x</span>VK Green</li>
                    </ul>

                    <h2>Customer notes:</h2>
                    <p className="indentedPara">pleawse dont put a lime in my Vk becaseu i dont think im not allergic to htem!!!!</p>
                </div>
                
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
                    <button className="orderButton">
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
            </PopupWindow>
        )
    }
}

PickupPopupWindow.propTypes = {
    order: PropTypes.object,
    showFunc: PropTypes.func.isRequired, // Callback function held in parent that calls popup window instance's ShowPopup()
    dismissedHandler: PropTypes.func.isRequired, // Function ran when billing popup is closed without action
}