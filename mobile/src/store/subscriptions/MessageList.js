import React, {Component} from 'react';
import {Text, View} from 'react-native';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const query = gql`
       query FindOrderById($id: ID!) {
                    findOrderById(id: $id) {
                        drinks {
                            name
                            category
                            price
                        }
                        collectionPoint {
                            name
                            collectionPointId
                        }
                        price
                        status
                        date
                        _id
                        collectionId
                        transactionId
                        userInfo{
                            email
                            name
                        }
                   }
                }
`;

const subscription = gql`
subscription {
  orderUpdated {
    _id
    status
  }
}
`;

class MessageListView extends Component {
    componentDidMount() {
        this.props.subscribeToMore();
    }
    render() {
        const { data } = this.props;
        console.log(data);
        return (
            <View>
                <Text style={{color: 'white'}}>Order Number: {data.findOrderById.collectionId} | Status: {data.findOrderById.status}</Text>
            </View>
        );
    }
}

const MessageList = () => (
    <Query query={query} variables={{id: '5c9bc6d65def1d0a9eb73847'}}>
        {({ loading, error, data, subscribeToMore }) => {
            if (loading) return <Text style={{color: 'white'}}>Loading...</Text>;
            if (error) {
                console.log(error);
                return <Text style={{color: 'white'}}>Error: {error.message}</Text>;
            }
            const more = () => subscribeToMore({
                document: subscription,
                updateQuery: (prev, { subscriptionData }) => {
                    console.log(subscriptionData);
                    if (!subscriptionData.data) return prev;
                    const { _id, status } = subscriptionData.data;
                    return null;
                },
            });
            return <MessageListView data={data} subscribeToMore={more}/>;
        }}
    </Query>
);

export default MessageList;
