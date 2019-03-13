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
                enabled: true
            },
            right: {
                visible: false,
                enabled: true
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
                        id: 'SideDrawer'
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

const setMainApp = async (componentId, barName) => {
    await Navigation.setStackRoot(componentId, {
        component: {
            name: screens.ViewMenus,
            options: {
                animations: {
                    setStackRoot: {
                        enabled: true
                    }
                },
                topBar: {
                    visible: true,
                    title: {
                        text: barName ? barName : 'The Taf'
                    }
                }
            }
        }
    });
};

const setViewDrinks = async (componentId, menuName) => {
    await Navigation.push(componentId, {
        component: {
            name: screens.ViewDrinksScreen,
            passProps: {
                authState: menuName
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

const setOrderStatus = async (componentId, orderNumber) => {
    await Navigation.push(componentId, {
        component: {
            name: screens.OrderStatus,
            passProps: {
                orderNumber: orderNumber
            },
            options: {
                topBar: {
                    visible: true,
                    title: {
                        text: 'Order Status',
                        color: colours.white,
                        largeTitle: true
                    },
                    subtitle: {
                        text: 'ETA: 10:59pm',
                        color: colours.orange,
                        fontSize: 12,
                        fontFamily: 'HelveticaNeue-Italic',
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

const setViewPastOrders = async (componentId, menuName) => {
    await Navigation.push(componentId, {
        component: {
            name: screens.ViewPastOrders,
            // passProps: {
            //     menuName: menuName
            // },
            options: {
                topBar: {
                    visible: true,
                    title: {
                        text: 'Order History',
                        color: colours.white,
                        largeTitle: true
                    },
                    subtitle: {
                        text: 'user id',
                        color: colours.orange,
                        fontSize: 12,
                        fontFamily: 'HelveticaNeue-Italic',
                    }
                }
            }
        }
    })
};


const setViewPastOrdersSettings = (image) => {
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

const setLoginSettings = () => {
    Navigation.setDefaultOptions({
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
                }
            }
        }
    })
};

const popToRoot = async (componentId) => {
    await Navigation.popToRoot(componentId);
};

export {
    setOrderStatus, popToRoot ,setViewPastOrders, setViewPastOrdersSettings, setViewBasket, setViewBasketSettings, setDefaultSettings, setWelcomePageRoot, setMainAppSettings, setMainApp, setLoginSettings, setLoginScreen, setViewDrinksSettings, setViewDrinks,
}
