import { commonConstants } from "../constants";

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

export const getUserRoleMenuLinks = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if(user) {
        let res = undefined;
        switch (user.roleId) {
            case 3:
                res = commonConstants.ADMIN_USER_ROLE_MENU;
                break;
            case 1:
                res = commonConstants.PUBLIC_USER_ROLE_MENU;
                break;
            case 2:
                res = commonConstants.OWNER_USER_ROLE_MENU;
                break;        
        }
        return res;
    } else {
        return undefined;
    }
}