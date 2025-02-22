import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './style.css'
import PopupWindow from '../popup-window/popup-window'
import TicketMockup from "../../assets/screenshot-mockup.png"

class ManualPickupPopupWindow extends Component {

    state = {
        orderID: null
    };

    handleChange = (event) => {
        this.setState({orderID: event.target.value.toUpperCase()})
    };


    onKeyDown(event) {
        if(event.which === 32) {
            event.preventDefault();
          }
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
                <form className="manualEnterContainer" onSubmit={(e) => {
                    this.setState({closePopup: true}, () => {
                        this.setState({closePopup: null});
                        this.props.pickupOrderFunc(this.state.orderID)
                    });
                    e.preventDefault();
                }}>
                    <input onKeyDown = {this.onKeyDown} autoFocus={true} className="manualCode" type="text" placeholder="enter code..." onChange={this.handleChange}/>
                    <br />
                    <button type="submit">Show collection screen</button>
                    <img id="ticketPicture" alt="Ticket preview" src={TicketMockup}/>
                </form>
            </PopupWindow>
        )
    }
}

ManualPickupPopupWindow.propTypes = {
    showFunc: PropTypes.func.isRequired, // Callback function held in parent that calls popup window instance's ShowPopup()
    pickupOrderFunc: PropTypes.func.isRequired // Function to run when submit is clicked
};

export default ManualPickupPopupWindow;
