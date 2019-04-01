import React, {Component} from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const query = gql`
       query FindOrdersByCollectionPoint($collectionPoint: ID!) {
            findOrdersByCollectionPoint(collectionPoint: $collectionPoint) {
                _id
                collectionId
                drinks {
                  _id
                  name
                  price
                  category
                }
                collectionPoint {
                  _id
                  collectionPointId
                }
                status
                date
                transactionId
                userInfo {
                    email
                    _id
                }
                orderAssignedTo {
                    _id
                    firstName
                    lastName
                }
           }
        }
`;

const subscription = gql`
subscription ($collectionPointId: ID!) {
  orderCreated(collectionPointId: $collectionPointId) {
                _id
                collectionId
                drinks {
                  _id
                  name
                  price
                  category
                }
                collectionPoint {
                  _id
                  collectionPointId
                }
                status
                date
                transactionId
                userInfo {
                    email
                    _id
                }
                orderAssignedTo {
                    _id
                    firstName
                    lastName
                }
   }
}
`;

class OrdersStream extends Component {

    state = {
        notificationSent: false
    };

    componentWillMount() {
        this.unsubscribe = this.props.subscribeToMore();
    }

    componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }

    render() {
        console.log(this.props);
        const orders = this.props.data.findOrdersByCollectionPoint;
        console.log(orders);
        return (
            <div>
                <h1>Orders</h1>
            </div>
        )
    }
}

const Orders = props => {
    console.log(props);
    return <Query query={query} variables={{collectionPoint: '5c925636bc63a912ed715316'}}>
        {({loading, error, data, subscribeToMore}) => {
            if (loading) return <p style={{color: 'white'}}>Loading...</p>;
            if (error) {
                console.log(error);
                return <p style={{color: 'white'}}>Error: {error.message}</p>;
            }
            const more = () => subscribeToMore({
                document: subscription,
                variables: {
                    collectionPointId: '5c925636bc63a912ed715316'
                },
                updateQuery: (prev, {subscriptionData}) => {
                    console.log(subscriptionData.data);
                    if (!subscriptionData.data) return prev;
                    return null;
                },
            });
            return <OrdersStream data={data} subscribeToMore={more}/>;
        }}
    </Query>
};

export default Orders;
