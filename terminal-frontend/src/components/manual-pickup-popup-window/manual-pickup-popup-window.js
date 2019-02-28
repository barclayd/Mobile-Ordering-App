import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import PopupWindow from '../popup-window/popup-window'

export default class ManualPickupPopupWindow extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            orderID: null,
        }
    }

    handleChange = (event) => {
        this.setState({orderID: event.target.value.toUpperCase()})
    }

    render () {
        return (
            <PopupWindow
                    className="manualPickup"
                    title={"Pickup order:"}
                    subtitle={(
                        <span>
                            Enter order code to collect order
                        </span>
                    )}
                    showCloseButton={true}
                    showFunc={this.props.showFunc}
                    closePopup={this.state.closePopup}
            >
                <input stlye="text-transform: uppercase" onChange={this.handleChange}/>
                <button onClick={() => {
                    this.setState({closePopup: true}, () => {
                        this.setState({closePopup: null})
                        this.props.pickupOrderFunc(this.state.orderID)
                    })
                }}>Submit</button>
            </PopupWindow>
        )
    }
}

ManualPickupPopupWindow.propTypes = {
    showFunc: PropTypes.func.isRequired, // Callback function held in parent that calls popup window instance's ShowPopup()
    pickupOrderFunc: PropTypes.func.isRequired // Function to run when submit is clicked
}