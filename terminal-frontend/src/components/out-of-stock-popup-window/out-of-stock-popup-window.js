import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import PopupWindow from '../popup-window/popup-window'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faBan } from '@fortawesome/free-solid-svg-icons';

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
                                    <span className="item">{itemData.name}</span>
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
                    subtitle={<span>Tap on items to mark out of stock</span>}
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