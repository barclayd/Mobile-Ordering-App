import React, {Component} from 'react';
import {Text} from 'react-native';

class OrderStatusView extends Component {
    componentDidMount() {
        this.props.subscribeToMore();
    }

    render() {
        const { data } = this.props;
        return (
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {data.allMessages.map(message => <Text style={{color: 'white'}} key={message.id} message={message} />)}
            </ul>
        );
    }
}

export default OrderStatusView;
