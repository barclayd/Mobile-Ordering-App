import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './style.css'
import PopupWindow from '../../containers/popup-window/popup-window'

class SwitchAccountsPopupWindow extends Component {
    state = {}

    render() {
        return (
            <PopupWindow
                    className="switchAccountsPopup"
                    title="Switch account:"
                    subtitle={<span>Select your username to add to the hotbar</span>}
                    showCloseButton={true}
                    showFunc={this.props.showFunc}
                    closePopup={this.state.closePopup}
            >
                <div className="staffMembersButtonContainer">
                    {
                        this.props.barStaff.map((staffMember) => {
                            let buttonClass = "staffMemberButton"
                            if (this.props.activeUser === staffMember._id) buttonClass += " selected"

                            return (
                                <button key={staffMember._id} className={buttonClass} onClick={()=>{ 
                                    this.setState({closePopup: true}, () => {
                                        this.setState({closePopup: null});
                                        this.props.switchAccountsFunc(staffMember._id)
                                    });
                                }}>
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
    }
};

SwitchAccountsPopupWindow.propTypes = {
    barStaff: PropTypes.array,
    showFunc: PropTypes.func, // Callback function held in parent that calls popup window instance's ShowPopup()
    activeUser: PropTypes.string, // Holds the ID of the currently logged in staff member
    switchAccountsFunc: PropTypes.func // Func to switch the current active bar staff ID
};

export default SwitchAccountsPopupWindow;
