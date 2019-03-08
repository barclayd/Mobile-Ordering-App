import * as actionTypes from "./actionTypes";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId, tokenExpiration, name) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId,
        tokenExpiration: tokenExpiration,
        name: name
    };
};

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT
    };
};

export const logoutSucceed = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = expirationTime => {
    return {
        type: actionTypes.AUTH_CHECK_TIMEOUT,
        expirationTime: expirationTime
    };
};

export const checkAuthRole = role => {
    return {
        type: actionTypes.AUTH_ROLE,
        role: role
    };
};


export const auth = (email, password, name, componentId, isSignUp, ) => {
    return {
        type: actionTypes.AUTH_USER,
        email: email,
        password: password,
        name: name,
        componentId: componentId,
        isSignUp: isSignUp
    };
};

export const setAuthRedirectPath = path => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = (componentId) => {
    return {
        type: actionTypes.AUTH_CHECK_STATE,
        componentId
    };
};

export const authStoreToken = () => {
    return {
        type: actionTypes.AUTH_STORE_TOKEN
    };
};

export const authAutoSignIn = () => {
    return {
        type: actionTypes.AUTH_AUTO_LOGIN
    };
};
