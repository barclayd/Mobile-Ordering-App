import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import PopupWindow from '../popup-window/popup-window'
import TimeAgo from '../time-ago-clean/time-ago-clean'
import { DateTime } from 'luxon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArchive } from '@fortawesome/free-solid-svg-icons';


export default class BillingPopupWindow extends React.Component {
    render () {
        return (
            <PopupWindow
                    className="billingOptions"
                    title={"#" + this.props.order.id + " Options"}
                    subtitle={(
                        // Time formatting with Luxon: https://moment.github.io/luxon/docs/manual/formatting.html#table-of-tokens
                        <span>
                            Ordered <TimeAgo date={this.props.order.orderDate}/>, at {DateTime.fromJSDate(this.props.order.orderDate).toFormat("h:mma")}
                        </span>
                    )}
                    showCloseButton={true}
                    showFunc={this.props.showFunc}
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
                        <span className="subtitle">Mark Unavailable</span>
                    </button>
                    <button className="orderButton">
                        <span className="icon delete"></span>
                        <span className="title">Delete</span>
                        <br />
                        <span className="subtitle">Cancel & charge</span>
                    </button>
                </div>
            </PopupWindow>
        )
    }
}

BillingPopupWindow.propTypes = {
    order: PropTypes.object,
    showFunc: PropTypes.func, // Callback function held in parent that calls popup window instance's ShowPopup()
}