import axios from 'axios';
import { configConstants } from '../constants';

// SET FOR LOCAL ENV
if(configConstants.ENVIRONMENT === configConstants.ENV_LOCAL){
    axios.defaults.baseURL = configConstants.API_LOCAL_SERVER_URL;
}

export const userService = {
    login,
    logout,
    register
};

function register(user) {
    return axios.post(`/api/user`, user);
}

function login(username, password) {
    return axios.post('/api/auth/login', {username, password})
                .then(u => localStorage.setItem('user', JSON.stringify(u)));
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