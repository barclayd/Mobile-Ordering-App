import {Navigation} from "react-native-navigation";
import * as colours from "../styles/colourScheme";
import * as screens from './screens';

const setDefaultSettings = () => {
    Navigation.setDefaultOptions({
        topBar: {
            visible: false
        },
        statusBar: {
            style: "light"
        },
        sideMenu: {
            openGestureMode: 'bezel',
            left: {
                visible: false,
                enabled: false
            },
            right: {
                visible: false,
                enabled: false
            }
        }
    });
};

const setWelcomePageRoot = async () => {
    await Navigation.setRoot({
        root: {
            sideMenu: {
                left: {
                    component: {
                        name: screens.SideDrawer,
                        id: 'SideDrawer',
                        options:{
                            statusBar: {
                                visible: true,
                                style: 'light'
                            }
                        }
                    },
                },
                center: {
                    stack: {
                        options: {
                            topBar: {
                                visible: false
                            }
                        },
                        id: 'WelcomeScreen',
                        children: [
                            {
                                component: {
                                    name: screens.WelcomeScreen,
                                },
                            },
                        ],
                    },
                },
                right: {
                    component: {
                        name: screens.Settings,
                        id: 'Settings',
                        options:{
                            statusBar: {
                                visible: true,
                                style: 'light'
                            }
                        }
                    },

                },
            },
        }
    });
};

const setMainAppSettings = (image1, image2) => {
    Navigation.setDefaultOptions({
        sideMenu: {
            openGestureMode: 'bezel',
            left: {
                enabled: true,
                visible: true,
            },
            right: {
                visible: true,
                enabled: true,
                disableOpenGesture: false
            }
        },
        statusBar: {
            hideWithTopBar: false,
        },
        topBar: {
            leftButtons: [
                {
                    id: 'menuButton',
                    icon: image1,
                    color: colours.white
                }
            ],
            barStyle: 'black',
            rightButtons: [
                {
                    id: 'profileButton',
                    icon: image2,
                    color: colours.white
                }
            ]
        }
    });
};

const setMainApp = async (componentId, barName, barCode) => {
    await Navigation.setStackRoot(componentId, {
        component: {
            name: screens.ViewMenus,
            id: 'ViewMenus',
            passProps: {
                barCode: barCode
            },
            options: {
                animations: {
                    setStackRoot: {
                        enabled: true
                    }
                },
                topBar: {
                    visible: true,
                    title: {
                        text: barName ? barName : 'DrinKing'
                    }
                }
            }
        }
    });
};

const setOrderStatus = async (componentId, collectionId, userId, collectionPoint, date, orderNumber) => {
    let component = componentId;
    if (!componentId) {
        component = 'ViewMenus';
    }
    await Navigation.push(component, {
        component: {
            name: screens.ActiveOrder,
            passProps: {
                collectionId,
                userId,
                collectionPoint,
                date,
                orderNumber
            },
            options: {
                topBar: {
                    visible: true,
                    title: {
                        text: 'Active Order',
                        color: colours.white,
                        largeTitle: true
                    },
                    subtitle: {
                        text: 'ETA: 10:59pm',
                        color: colours.orange,
                        fontSize: 12,
                        fontFamily: 'HelveticaNeue-Italic',
                    }
                },
                statusBar: {
                    visible: true,
                    style: 'light'
                }
            }
        }
    })
};

const showQRCodeOnNotificationPress = async (showQRCode, collectionId, icon) => {
    await Navigation.showModal({
        stack: {
            children: [{
                component: {
                    name: screens.ActiveOrder,
                    passProps: {
                        showQRCode,
                        collectionId
                    },
                    options: {
                        topBar: {
                            rightButtons: {
                                id: 'close',
                                icon: icon,
                                color: colours.white
                            },
                            leftButtons: [],
                            visible: true,
                        }
                    }
                }
            }]
        }
    })
};

const showLoginOnNotificationPress = async (barId, icon) => {
    await Navigation.showModal({
        stack: {
            children: [{
                component: {
                    name: screens.AuthScreen,
                    passProps: {
                        barId,
                        modal: true,
                        authState: "login"
                    },
                    options: {
                        topBar: {
                            rightButtons: {
                                id: 'close',
                                icon: icon,
                                color: colours.white
                            },
                            leftButtons: [],
                            visible: true,
                        }
                    }
                }
            }]
        }
    })
};

const closeLoginModal = async (componentId) => {
    Navigation.dismissModal(componentId);
}

const setSwitchBars = async (componentId) => {
    let component = componentId;
    if (!componentId) {
        component = 'ViewMenus';
    }
    await Navigation.push(component, {
        component: {
            name: screens.SwitchBar,
            options: {
                topBar: {
                    visible: true,
                    title: {
                        text: 'Switch Bars',
                        color: colours.white,
                        largeTitle: true
                    }
                }
            }
        }
    })
};

const setViewBasket = async (componentId, basketName, fullScreenMode) => {
    await Navigation.push(componentId, {
        component: {
            name: screens.ViewCheckout,
            passProps: {
                authState: basketName,
                fullScreen: fullScreenMode
            },
            sideMenu: {
                openGestureMode: 'bezel',
                left: {
                    enabled: false,
                    visible: false
                },
                right: {
                    visible: false,
                    enabled: false
                }
            },
            options: {
                topBar: {
                    visible: true,
                    title: {
                        text: basketName,
                    }
                },statusBar: {
                    visible: true,
                    style: 'light'
                }
            }
        }
    })
};

const setViewBasketSettings = (image) => {
    Navigation.setDefaultOptions({
        topBar: {
            visible: true,
            barStyle: 'black',
            rightButtons: [
            {
                id: 'basketButton',
                icon: image,
                color: colours.white
            }
        ]
    }
    });
};

const setViewDrinks = async (componentId, menuName, menuId) => {
    await Navigation.push(componentId, {
        component: {
            name: screens.ViewDrinksScreen,
            passProps: {
                authState: menuName,
                menuId
            },
            options: {
                topBar: {
                    visible: true,
                    title: {
                        text: menuName,
                    }
                }
            }
        }
    })
};

const setViewDrinksSettings = (image) => {
    Navigation.setDefaultOptions({
        topBar: {
            visible: true,
            barStyle: 'black',
            rightButtons: [
            {
                id: 'basketButton',
                icon: image,
                color: colours.white
            }
        ]
    }
    });
};

const setViewPastOrders = (componentId, menuName) => {
    Navigation.push("ViewMenus", {
        component: {
            name: screens.ViewPastOrders,
            passProps: {
                menuName: menuName
            },
            options: {
                topBar: {
                    visible: true,
                    title: {
                        text: 'Order History',
                        color: colours.white,
                        largeTitle: true
                    }
                },statusBar: {
                    visible: true,
                    style: 'light'
                }

            }
        }
    })
};


const setViewPastOrdersSettings = () => {
    Navigation.setDefaultOptions({
        sideMenu: {
            openGestureMode: 'bezel',
            left: {
                enabled: true,
                visible: true,
            },
            right: {
                visible: true,
                enabled: true,
                disableOpenGesture: false
            }
        },
        statusBar: {
            hideWithTopBar: false,
        },
        topBar: {
            leftButtons: [
                {
                    id: 'menuButton',
                    color: colours.white
                }
            ],
            barStyle: 'black',
            rightButtons: [
                {
                    id: 'profileButton',
                    color: colours.white
                }
            ]
        }
    });
};

const setLoginSettings = () => {
    Navigation.setDefaultOptions({
        openGestureMode: 'bezel',
        topBar: {
            visible: true,
            barStyle: 'black'
        }
    });
};

const setLoginScreen = async (componentId, authType) => {
    let authText;
    authText = authType === 'login' ? 'Login' : 'Sign Up';
    await Navigation.push(componentId, {
        component: {
            name: screens.AuthScreen,
            passProps: {
                authState: authType
            },
            options: {
                topBar: {
                    title: {
                        text: authText,
                    }
                },
                statusBar: {
                    visible: true,
                    style: 'light'
                }
            }
        }
    })
};

const popToRoot = async (componentId) => {
    await Navigation.popToRoot(componentId);
};

const pop = async (componentId) => {
    await Navigation.pop(componentId);
};

export {
    closeLoginModal, showLoginOnNotificationPress, setOrderStatus, setSwitchBars, popToRoot, pop, setViewPastOrders, setViewPastOrdersSettings, setViewBasket, setViewBasketSettings, setDefaultSettings, setWelcomePageRoot, setMainAppSettings, setMainApp, setLoginSettings, setLoginScreen, setViewDrinksSettings, setViewDrinks, showQRCodeOnNotificationPress
}
