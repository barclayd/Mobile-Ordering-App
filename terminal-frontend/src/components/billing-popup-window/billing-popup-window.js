import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import PopupWindow from '../popup-window/popup-window'
import TimeAgo from '../time-ago-clean/time-ago-clean'
import { DateTime } from 'luxon'

export default class BillingPopupWindow extends React.Component {
    render () {
        if (!this.props.order) return null;
        return (
            <PopupWindow
                    className="billingOptions"
                    title={"#" + this.props.order.id + " pickup"}
                    subtitle={(
                        // Time formatting with Luxon: https://moment.github.io/luxon/docs/manual/formatting.html#table-of-tokens
                        <span>
                            Ordered <TimeAgo date={this.props.order.orderDate}/>, at {DateTime.fromJSDate(this.props.order.orderDate).toFormat("h:mma")}
                        </span>
                    )}
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
            </PopupWindow>
        )
    }
}

BillingPopupWindow.propTypes = {
    order: PropTypes.object,
    showFunc: PropTypes.func.isRequired, // Callback function held in parent that calls popup window instance's ShowPopup()
    dismissedHandler: PropTypes.func.isRequired, // Function ran when billing popup is closed without action
}