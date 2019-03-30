import {RNNotificationBanner} from "react-native-notification-banner";
import Icon from "react-native-vector-icons/Ionicons";
import React from "react";

const alert = <Icon name="ios-alert" size={24} color="#FFFFFF" family={"Ionicons"} />;
const errorNotification = (title, subHeading, duration) => {
    RNNotificationBanner.Error({duration: duration, title: `${title}`, subTitle: `${subHeading}`, withIcon: true, icon: alert});
};

export {
    errorNotification
};
