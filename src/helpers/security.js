export const AUTH_KEY = 'x-auth-key';
export const USER_KEY = 'user';

export const hasAuthKey = () => {
    const auth_key = sessionStorage.getItem(AUTH_KEY);
    return auth_key != undefined && auth_key.length > 0;
}

export const getAuthKey = () => {
    return hasAuthKey() ? sessionStorage.getItem(AUTH_KEY) : undefined;
}

export const setSessionData = (key, value) => {
    sessionStorage.setItem(key, value);
}

export const resetAuthKey = () => {
    sessionStorage.removeItem(AUTH_KEY);
}

export const removeSessionAttribute = (key) => {
    if(key){
        sessionStorage.removeItem(key);
    }
}