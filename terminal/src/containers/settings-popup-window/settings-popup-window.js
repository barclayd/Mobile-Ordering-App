import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './style.css'
import PopupWindow from '../../containers/popup-window/popup-window'

class SettingsPopupWindow extends Component {
    state = {}

    render() {
        return (
            <PopupWindow
                    className="switchAccountsPopup"
                    title="Settings:"
                    subtitle={<span>Select your username to add to the hotbar</span>}
                    showCloseButton={true}
                    showFunc={this.props.showFunc}
            >
            </PopupWindow>
        )
    }
};

SettingsPopupWindow.propTypes = {
    showFunc: PropTypes.func, // Callback function held in parent that calls popup window instance's ShowPopup()
};

export default SettingsPopupWindow;