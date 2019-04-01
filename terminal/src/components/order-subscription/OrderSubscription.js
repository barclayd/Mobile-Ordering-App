import React, {Component} from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import {connect} from 'react-redux';
import * as actions from "../../store/actions";

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

    componentWillMount() {
        this.unsubscribe = this.props.subscribeToMore();
    }

    componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }

    render() {
        return (
            <>
            </>
        )
    }
}

const Orders = props => {
    return <Query query={query} variables={{collectionPoint: '5c925636bc63a912ed715316'}}>
        {({loading, error, data, subscribeToMore}) => {
            if (loading) return <p style={{color: 'white', opacity: 0}}>Loading...</p>;
            if (error) {
                console.log(error);
                return <p style={{color: 'white', opacity: 0}}>Error: {error.message}</p>;
            }
            const more = () => subscribeToMore({
                document: subscription,
                variables: {
                    collectionPointId: '5c925636bc63a912ed715316'
                },
                updateQuery: (prev, {subscriptionData}) => {
                    if (!subscriptionData.data) return prev;
                    if (subscriptionData.data.orderCreated) {
                        props.newOrder(subscriptionData.data.orderCreated);
                    }
                    return null;
                }
            });
            return <OrdersStream data={data} subscribeToMore={more}/>;
        }}
    </Query>
};

const mapDispatchToProps = dispatch => {
    return {
        newOrder: (order) => dispatch(actions.newOrder(order))
    }
};

export default connect(null, mapDispatchToProps)(Orders);
