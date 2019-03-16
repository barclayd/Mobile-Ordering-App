import React from 'react';
import {Text} from 'react-native';
import {Overlay} from 'react-native-elements';
import * as colours from '../../../styles/colourScheme';

const showOrder = props => {

    return (
        <Overlay
            onBackdropPress={props.hideOrder}
            isVisible={props.visible}>
            <Text>Order: #1324</Text>
        </Overlay>
    )
};

export default showOrder;
