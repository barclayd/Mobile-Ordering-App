import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './style.css'
import PopupWindow from '../popup-window/popup-window'

class MoreAccountsPopupWindow extends Component {
    state = {}

    render() {
        return (
            <PopupWindow
                    className="moreAccountsPopup"
                    title="More accounts:"
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
                                        this.props.moreAccountsFunc(staffMember._id)
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

MoreAccountsPopupWindow.propTypes = {
    barStaff: PropTypes.array,
    showFunc: PropTypes.func, // Callback function held in parent that calls popup window instance's ShowPopup()
    activeUser: PropTypes.string, // Holds the ID of the currently logged in staff member
    moreAccountsFunc: PropTypes.func // Func to switch the current active bar staff ID
};

export default MoreAccountsPopupWindow;
