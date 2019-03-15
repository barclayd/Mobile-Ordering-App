import React from 'react';
import {Text} from 'react-native';
import {Overlay} from 'react-native-elements';
import * as colours from '../../../styles/colourScheme';

const mobilePayments = props => {

    return (
        <Overlay
            onBackdropPress={props.hidePayment}
            isVisible={props.visible}>
            <Text>Pay with Card</Text>
        </Overlay>
    )
};

export default mobilePayments;
