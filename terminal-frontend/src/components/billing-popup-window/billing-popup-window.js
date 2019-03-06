import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import PopupWindow from '../popup-window/popup-window'
import TimeAgo from '../time-ago-clean/time-ago-clean'
import { DateTime } from 'luxon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArchive, faTrashAlt } from '@fortawesome/free-solid-svg-icons';


export default class BillingPopupWindow extends React.Component {
    buildTitle = (order) => {
        if (order) return "#" + order.id + " options"; else return "";
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
                    className="billingOptionsPopup"
                    title={this.buildTitle(this.props.order)}
                    subtitle={this.buildSubtitle(this.props.order)}
                    showCloseButton={true}
                    showFunc={this.props.showFunc}
                    dismissedHandler={this.props.dismissedHandler}
            >
                <h1>DRINKS:</h1>
                <div className="indentedContent">
                    <ul className="orderList">
                        <li>
                            <span className="quantity">4x</span>
                            <span className="item">VK Orange</span>
                            <span className="price">£2</span>
                        </li>
                        <li>
                            <span className="quantity">1x</span>
                            <span className="item">VK Green</span>
                            <span className="price">£2.50</span>
                        </li>
                        <li>
                            <span className="quantity">1x</span>
                            <span className="item">VK Green</span>
                            <span className="price">£2.50</span>
                        </li>
                    </ul>
                    <div className="billingTotal">
                        <span className="totalText">Total:</span><span className="totalAmount">£20</span>
                    </div>
                </div>
                    
                <div className="popupButtonsContainer">
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

BillingPopupWindow.propTypes = {
    order: PropTypes.object,
    showFunc: PropTypes.func.isRequired, // Callback function held in parent that calls popup window instance's ShowPopup()
}