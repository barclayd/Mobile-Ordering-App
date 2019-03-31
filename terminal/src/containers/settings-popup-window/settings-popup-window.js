import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './style.css'
import PopupWindow from '../../containers/popup-window/popup-window'

class SettingsPopupWindow extends Component {
    state = {}
 
    showCollectionPoint = () => {
        this.setState({closePopup: true}, ()=>{
            this.setState({closePopup: null})
            this.props.showCollectionPoint();
        })
    };

    render() {
        return (
            <PopupWindow
                    className="switchAccountsPopup"
                    title="Settings:"
                    subtitle={<span>Further options below</span>}
                    showCloseButton={true}
                    showFunc={this.props.showFunc}
                    closePopup={this.state.closePopup}
            >
            <div onClick={this.showCollectionPoint} className="collectionpointbutton">
            <h2>Change collection point:</h2> 
                <button  className="collection">Change collection point</button>
            </div>

            <div className = "InputContainer"> 
                <h2>Find Order by Longer ID:</h2>
                <form>
                <input type = "text"/>
                
                </form>
            </div>

            <div className = "InputContainer2"> 
                <h2>Find Order history by Customer:</h2>
                <form>
                <input type = "text"/>
                
                </form>
            </div>
            </PopupWindow>
        )
    }
};

SettingsPopupWindow.propTypes = {
    showFunc: PropTypes.func,
    showCollectionPoint: PropTypes.func.isRequired, // Callback function held in parent that calls popup window instance's ShowPopup()
};

export default SettingsPopupWindow;