import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import PopupWindow from '../../containers/popup-window/popup-window';
import TimeAgo from '../../containers/time-ago-clean/time-ago-clean';
import { DateTime } from 'luxon';

const NotesPopupWindow = props => {

    // Time formatting with Luxon: https://moment.github.io/luxon/docs/manual/formatting.html#table-of-tokens
    const buildSubtitle = (order) => {
        if (order) return (
            <span>
                for <span className="orderID">#{order.id}</span> ordered at {DateTime.fromJSDate(order.orderDate).toFormat("h:mma")},&nbsp;
                <TimeAgo date={order.orderDate}/>
            </span>
        ); else return (<span></span>);
    };

    const buildNotes = (order) => {
        if (order) return (<p className="notesPara">{order.notes}</p>); else return "";
    };

        return (
            <PopupWindow
                    className="notes"
                    title={"Customer notes:"}
                    subtitle={buildSubtitle(props.order)}
                    showCloseButton={true}
                    showFunc={props.showFunc}
            >
                {buildNotes(props.order)}
            </PopupWindow>
        )
};

NotesPopupWindow.propTypes = {
    order: PropTypes.object,
    showFunc: PropTypes.func.isRequired, // Callback function held in parent that calls popup window instance's ShowPopup()
};

export default NotesPopupWindow;
