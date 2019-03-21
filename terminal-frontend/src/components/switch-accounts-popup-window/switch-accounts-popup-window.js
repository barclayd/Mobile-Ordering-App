
import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import PopupWindow from '../../containers/popup-window/popup-window'

const switchAccountsPopupWindow = (props) => {

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
                    props.staffMembers.map((staffMember) => {
                        return (
                            <button key={staffMember.id} className="staffMemberButton">
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

switchAccountsPopupWindow.propTypes = {
    staffMembers: PropTypes.array,
    showFunc: PropTypes.func, // Callback function held in parent that calls popup window instance's ShowPopup()
};

export default switchAccountsPopupWindow;
