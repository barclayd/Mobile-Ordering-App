import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import PopupWindow from '../popup-window/popup-window'
import TimeAgo from '../time-ago-clean/time-ago-clean'
import { DateTime } from 'luxon'

export default class NotesPopupWindow extends React.Component {
    render () {
        return (
            <PopupWindow
                    className="notes"
                    title={"Customer notes:"}
                    subtitle={(
                        // Time formatting with Luxon: https://moment.github.io/luxon/docs/manual/formatting.html#table-of-tokens
                        <span>
                            for <span className="orderID">#{this.props.order.id}</span> ordered at {DateTime.fromJSDate(this.props.order.orderDate).toFormat("h:mma")},&nbsp;
                            <TimeAgo date={this.props.order.orderDate}/>
                        </span>
                    )}
                    showCloseButton={true}
                    closeFunc={this.props.closeFunc}
            >
                <p className="notesPara">{this.props.order.notes}</p>
            </PopupWindow>
        )
    }
}

NotesPopupWindow.propTypes = {
    order: PropTypes.object,
    closeFunc: PropTypes.func
}