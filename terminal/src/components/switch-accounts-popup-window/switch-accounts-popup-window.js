
import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import PopupWindow from '../../containers/popup-window/popup-window'

const SwitchAccountsPopupWindow = (props) => {

    return (
        <PopupWindow
                className="switchAccountsPopup"
                title="Switch account:"
                subtitle={<span>Select your username to add to the hotbar</span>}
                showCloseButton={true}
                showFunc={props.showFunc}
        >
            <div className="staffMembersButtonContainer">
                {
                    props.barStaff.map((staffMember) => {
                        return (
                            <button key={staffMember._id} className="staffMemberButton">
                                {staffMember.firstName}
                                <br/>
                                {staffMember.surname}
                            </button>
                        )
                    })
                }
            </div>
        </PopupWindow>
    )
};

SwitchAccountsPopupWindow.propTypes = {
    barStaff: PropTypes.array,
    showFunc: PropTypes.func, // Callback function held in parent that calls popup window instance's ShowPopup()
};

export default SwitchAccountsPopupWindow;
