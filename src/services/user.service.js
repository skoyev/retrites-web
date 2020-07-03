import axios from 'axios';
import { configConstants } from '../constants';

// SET FOR LOCAL ENV
if(configConstants.ENVIRONMENT === configConstants.ENV_LOCAL){
    axios.defaults.baseURL = configConstants.API_LOCAL_SERVER_URL;
}

export const userService = {
    login,
    logout,
    register,
    validateAuthKey,
    userSubscribe,
    isUserEmailAlreadyRegistered
};

function isUserEmailAlreadyRegistered(email){
    let params = {email:email};
    return axios.get(`/api/user/check-email`, {params:params});
}

function userSubscribe(data) {
    return axios.post(`/api/user/subscribe`, {email:data.email, name: data.name, catIds:data.catIds}, {});
}

function validateAuthKey(authKey) {
    if(authKey){
        const headers = {
            'Content-Type': 'application/json',
            'x-auth-key': authKey
        }
        return axios.post(`/api/auth/authKey`, {}, { headers: headers });
    } else {
        // TODO: add error handling
        console.error('Call validateAuthKey is invalid for the undefined authKey')
        return Promise.reject(`Auth key - ${authKey} is invalid to validate.`);
    }
}

function register(user) {
    return axios.post(`/api/user`, user);
}

function login(email, password, activateCode) {
    return axios.post('/api/auth/login', {email, password, activateCode})
                .then(u => {
                    //sessionStorage.setItem('user', JSON.stringify(u))
                    return u;
                });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                //location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}