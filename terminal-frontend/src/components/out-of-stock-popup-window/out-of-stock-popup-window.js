import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import PopupWindow from '../popup-window/popup-window'

export default class SwitchAccountsPopupWindow extends React.Component {
    render () {
        return (
            <PopupWindow
                    className="outofStockPopup"
                    title="OUT OF STOCK:"
                    subtitle={<span>Tap on items to mark out of stock</span>}
                    showCloseButton={true}
                    showFunc={this.props.showFunc}
        ></PopupWindow> 
        )
     }

    };