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

const setWelcomePageRoot = () => {
    Navigation.setRoot({
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
            left: {
                enabled: true,
                visible: true
            },
            right: {
                visible: true,
                enabled: true
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

const setMainApp = (componentId, barName) => {
    Navigation.setStackRoot(componentId, {
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
                        text: barName ? barName : 'The Taff'
                    }
                }
            }
        }
    });
};

const setViewDrinks = (componentId, menuName) => {
    Navigation.push(componentId, {
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

const setViewDrinksSettings = (image2) => {
    Navigation.setDefaultOptions({
        topBar: {
            visible: true,
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

const setLoginSettings = () => {
    Navigation.setDefaultOptions({
        topBar: {
            visible: true,
            barStyle: 'black'
        }
    });
};

const setLoginScreen = (componentId, authType) => {
    let authText;
    authText = authType === 'login' ? 'Login' : 'Sign Up';
    Navigation.push(componentId, {
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


export {
    setDefaultSettings, setWelcomePageRoot, setMainAppSettings, setMainApp, setLoginSettings, setLoginScreen, setViewDrinksSettings, setViewDrinks, 
}
