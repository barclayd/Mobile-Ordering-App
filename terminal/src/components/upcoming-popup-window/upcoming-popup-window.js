import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import PopupWindow from '../../containers/popup-window/popup-window'
import TimeAgo from '../../containers/time-ago-clean/time-ago-clean'
import MultiColumnItemList from '../multi-column-item-list/multi-column-item-list';

const UpcomingPopupWindow = (props) => {
    return (
        <PopupWindow
                className="upcomingOrdersPopup"
                title={"Upcoming orders:"}
                subtitle={(
                    <span>
                        pending orders unclaimed by bartenders
                    </span>
                )}
                showCloseButton={true}
                showFunc={props.showFunc}
        >
            <div className="ordersContainer">
                {
                    props.pendingOrders.map((orderData, counter) => {
                        return (
                            <div key={counter} className="orderContainer in-progress">

                                <MultiColumnItemList orderItems={orderData.drinks} />
                                <h3>#{orderData.collectionId} - <TimeAgo date={orderData.date}/></h3>

                                {/*
                                    { this.renderCustomerNotes(orderData.notes) }

                                    <div className="orderButtonsContainer">
                                        <button className="orderButton">
                                        <span className="icon ready"></span>
                                        <span className="title">Ready</span>
                                        <br />
                                        <span className="subtitle">Mark as ready</span>
                                        </button>
                                        <button className="orderButton">
                                        <span className="icon notInProgress"></span>
                                        <span className="title">Not in progress</span>
                                        <br />
                                        <span className="subtitle">Return to pending</span>
                                        </button>
                                        <button onClick={this.state.showBilling} className="orderButton">
                                        <span className="icon"></span>
                                        <span className="title">More</span>
                                        <br />
                                        <span className="subtitle">Billing &amp; more</span>
                                        </button>
                                    </div>
                                */}
                            </div>
                        );
                    })
                }
            </div>
        </PopupWindow>
    )
};

UpcomingPopupWindow.propTypes = {
    showFunc: PropTypes.func.isRequired, // Callback function held in parent that calls popup window instance's ShowPopup()
    pendingOrders: PropTypes.array.isRequired // Pending orders to be listed
};

export default UpcomingPopupWindow;
