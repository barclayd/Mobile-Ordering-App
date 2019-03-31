import React, {Component} from 'react';
import {Text, View} from 'react-native';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const query = gql`
{
  allMessages(orderBy: createdAt_DESC, first: 20) {
    id
    createdAt
    text
    author
  }
}
`;

const subscription = gql`
subscription Message {
  Message {
    mutation
    node {
      id
      createdAt
      text
      author
    }
  }
}
`;

const MessageItem = ({ message }) => (
    <View style={{ border:  1}}>
        <Text style={{color: 'white'}}>
            {message.author || 'Anonymous'}: {' '}
            {message.text} {' '}
            {new Date(message.createdAt).toLocaleString()}
        </Text>
    </View>
);

class MessageListView extends Component {
    componentDidMount() {
        this.props.subscribeToMore();
    }
    render() {
        const { data } = this.props;
        return (
            <View>
                {data.allMessages.map(message => <MessageItem key={message.id} message={message} />)}
            </View>
        );
    }
}

const MessageList = () => (
    <Query query={query}>
        {({ loading, error, data, subscribeToMore }) => {
            if (loading) return <Text style={{color: 'white'}}>Loading...</Text>;
            if (error) return <Text style={{color: 'white'}}>Error: {error.message}</Text>;
            const more = () => subscribeToMore({
                document: subscription,
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) return prev;
                    const { mutation, node } = subscriptionData.data.Message;
                    if (mutation !== 'CREATED') return prev;
                    return Object.assign({}, prev, {
                        allMessages: [node, ...prev.allMessages].slice(0, 20),
                    });
                },
            });
            return <MessageListView data={data} subscribeToMore={more}/>;
        }}
    </Query>
);

export default MessageList;
