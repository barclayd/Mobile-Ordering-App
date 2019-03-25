import React, {Component} from 'react'
import PropTypes from 'prop-types'

var timeago = require("timeago.js");

// SETTINGS:
const secondsUntilTimeShown = 60; // Seconds until "just now" is no longer the time. Using 60 sec because of complaints of distracting updates/changes

class TimeAgoClean extends Component {
    state = {
        timeAgo: timeago.format(this.props.date)
    };

    // Recalculate timeAgo and rerender if needed
    componentDidMount () {
        this.reRender = setInterval(() => {
            let newTimeAgo = timeago.format(this.props.date);
            if ((new Date() - this.props.date) / 1000 > secondsUntilTimeShown && newTimeAgo !== this.state.timeAgo) {
                this.setState({ timeAgo: newTimeAgo })
            }
        }, 1000)
    }

    componentWillUnmount () {
        clearInterval(this.reRender)
    }

    render () {
        return this.state.timeAgo
    }
}

TimeAgoClean.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired
};

export default TimeAgoClean;