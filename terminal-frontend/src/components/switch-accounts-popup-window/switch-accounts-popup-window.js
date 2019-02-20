import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import PopupWindow from '../popup-window/popup-window'

export default class SwitchAccountsPopupWindow extends React.Component {
    render () {
        return (
            <PopupWindow
                    className="switchAccounts"
                    title="Switch account:"
                    subtitle={<span>Select your username to add to the hotbar</span>}
                    showCloseButton={true}
                    showFunc={this.props.showFunc}
            >
                <div className="staffMembersButtonContainer">
                    {
                        this.props.staffMembers.map((staffMember) => {
                            return (
                                    <button className="staffMemberButton">{staffMember.firstName}</button>
                            )
                        })
                    }
                </div>
            </PopupWindow>
        )
    }
}

SwitchAccountsPopupWindow.propTypes = {
    staffMembers: PropTypes.array,
    showFunc: PropTypes.func, // Callback function held in parent that calls popup window instance's ShowPopup()
}