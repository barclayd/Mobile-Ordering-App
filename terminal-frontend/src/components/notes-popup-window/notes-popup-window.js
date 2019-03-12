import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import PopupWindow from '../popup-window/popup-window'
import TimeAgo from '../time-ago-clean/time-ago-clean'
import { DateTime } from 'luxon'

export default class NotesPopupWindow extends React.Component {

    // Time formatting with Luxon: https://moment.github.io/luxon/docs/manual/formatting.html#table-of-tokens
    buildSubtitle = (order) => {
        if (order) return (
            <span>
                for <span className="orderID">#{order.id}</span> ordered at {DateTime.fromJSDate(order.orderDate).toFormat("h:mma")},&nbsp;
                <TimeAgo date={order.orderDate}/>
            </span>
        ); else return (<span></span>);
    }
    
    buildNotes = (order) => {
        if (order) return (<p className="notesPara">{order.notes}</p>); else return "";
    }

    render () {
        return (
            <PopupWindow
                    className="notes"
                    title={"Customer notes:"}
                    subtitle={this.buildSubtitle(this.props.order)}
                    showCloseButton={true}
                    showFunc={this.props.showFunc}
            >
                {this.buildNotes(this.props.order)}
            </PopupWindow>
        )
    }
}

NotesPopupWindow.propTypes = {
    order: PropTypes.object,
    showFunc: PropTypes.func.isRequired, // Callback function held in parent that calls popup window instance's ShowPopup()
}