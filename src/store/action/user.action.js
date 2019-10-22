import { userConstants } from '../../constants';
import { userService } from '../../services';
import { history } from '../../helpers';

export const userActions = {
    login,
    logout,
    register,
    resetLogin
};

function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }

function createUserSuccess(shouldRedirectHomePage) { return { type: userConstants.CREATE_USER_SUCCESS, shouldRedirectHomePage } }
function createUserFailure(error) { return { type: userConstants.CREATE_USER_FAILURE, error } }

function resetLogin(){
    return { type: userConstants.RESET_LOGIN }
}

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                    //history.push('/dashboard');
                },
                error => {
                    dispatch(failure(error.response.data.data));                    
                }
            );
    };
}

function logout() {
    //userService.logout();
    //history.push('/');
    //return { type: userConstants.LOGOUT }; 
    return dispatch => {
        userService.logout();
        history.push('/home');
    }   
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => { 
                    dispatch(createUserSuccess(true));
                    //history.push('/home');
                },
                error => {
                    dispatch(createUserFailure(error));
                }
            );
    };
}
