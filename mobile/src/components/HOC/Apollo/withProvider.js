import React, {Component} from 'react';
import {ApolloProvider} from "react-apollo";
import { Provider } from "react-redux";

const withProvider = (Component, store, client = localClient) => {
    return class extends React.Component {
        static options = Component.options;

        render () {
            return (
                <ApolloProvider store={store} client={client}>
                    <Provider store={store}>
                        <Component {...this.props} />
                    </Provider>
                </ApolloProvider>
            )
        }
    }
};

export default withProvider;
