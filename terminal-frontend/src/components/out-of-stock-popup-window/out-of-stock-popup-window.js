import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import PopupWindow from '../popup-window/popup-window'

export default class OutOfStockPopUpWindow extends React.Component {
    
    buildChildren = (order) => {
        if (order) return (
            <React.Fragment>
                <h1>DRINKS:</h1>
                <div className="indentedContent">
                    <ul className="orderList">
                        {order.items.map((itemData) => {
                            return (
                                <li key={itemData.id}>
                                    <span className="quantity">{itemData.quantity}</span>
                                    <span className="item">{itemData.name}</span>
                                    <span className="price">£{itemData.price}</span>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </React.Fragment>
        ); else return "";
    }

    render () {
       return (
            <PopupWindow
                    className="outofStockPopup"
                    title="OUT OF STOCK:"
                    subtitle={<span>Tap on items to mark out of stock</span>}
                    showCloseButton={true}
                    showFunc={this.props.showFunc}
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