import React from 'react'
import PropTypes from 'prop-types'
import TimeAgo from 'react-timeago'

const secondsUntilTimeShown = 10
export default class TimeAgoClean extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dateNow: new Date()
        }
    }

    // Trigger a re-render every second
    componentDidMount () {
        this.reRender = setInterval(() => {
            this.setState({dateNow: new Date()})
        }, 1000)
    }

    componentWillUnmount () {
        clearInterval(this.reRender)
    }

    render () {
        if ((this.state.dateNow - this.props.date) / 1000 < secondsUntilTimeShown)
            return <span>just now</span>
        else
            return <TimeAgo date={this.props.date}/>
    }
}

TimeAgoClean.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired
}