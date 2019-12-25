const AUTH_KEY = 'auth_key';

export const hasAuthKey = () => {
    const auth_key = sessionStorage.getItem(AUTH_KEY);
    return auth_key != undefined && auth_key.length > 0;
}

export const getAuthKey = () => {
    return hasAuthKey() ? sessionStorage.getItem(AUTH_KEY) : undefined;
}