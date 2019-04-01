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

class OrderStatusView extends Component {
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

const OrderStatus = props => {
    console.log(props);
    return <Query query={query} variables={{id: props.orderId}}>
        {({loading, error, data, subscribeToMore}) => {
            if (loading) return <Text style={{color: 'white'}}>Loading...</Text>;
            if (error) {
                console.log(error);
                return <Text style={{color: 'white'}}>Error: {error.message}</Text>;
            }
            const more = () => subscribeToMore({
                document: subscription,
                updateQuery: (prev, {subscriptionData}) => {
                    if (!subscriptionData.data) return prev;
                    const {_id, status} = subscriptionData.data;
                    return null;
                },
            });
            return <OrderStatusView data={data} subscribeToMore={more}/>;
        }}
    </Query>
};

export default OrderStatus;
