import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import PopupWindow from '../popup-window/popup-window'
import TimeAgo from '../time-ago-clean/time-ago-clean'
import { DateTime } from 'luxon'

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
            </PopupWindow>
        )
    }
}

PickupPopupWindow.propTypes = {
    order: PropTypes.object,
    showFunc: PropTypes.func.isRequired, // Callback function held in parent that calls popup window instance's ShowPopup()
    dismissedHandler: PropTypes.func.isRequired, // Function ran when billing popup is closed without action
}
