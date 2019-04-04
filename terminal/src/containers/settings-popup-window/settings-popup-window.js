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
                    subtitle={<span>configure this terminal</span>}
                    showCloseButton={true}
                    showFunc={this.props.showFunc}
                    closePopup={this.state.closePopup}
            >
                <div className="collectionpointbutton">
                    <h2>Change collection point:</h2> 
                    <button onClick={this.showCollectionPoint} className="collection">Change collection point</button>
                </div>

                <div className="InputContainer"> 
                    <h2>Find Order by Longer ID:</h2>
                    <input type="text"/>
                </div>

                <div className="InputContainer"> 
                    <h2>Find Order history by Customer:</h2>
                    <input type="text"/>
                </div>

                <div className="InputContainer">
                    <h2>Reload page:</h2>
                    <button onClick={()=>window.location.reload()}>Reload</button>
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