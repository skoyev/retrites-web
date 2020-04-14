import { userConstants } from '../../constants';
import { userService } from '../../services';
import { history, hasAuthKey, getAuthKey, resetAuthKey } from '../../helpers';

export const userActions = {
    login,
    logout,
    register,
    resetLogin,
    isLoggedIn,
    userSubscribe
};

function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
function success_() { return { type: userConstants.SUCCESS } }
function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }

function createUserSuccess(shouldRedirectHomePage) { return { type: userConstants.CREATE_USER_SUCCESS, shouldRedirectHomePage } }
function createUserFailure(error) { return { type: userConstants.CREATE_USER_FAILURE, error } }

function isLoggedInResult(isLoggedIn) { return { type: userConstants.IS_LOGGED_IN, isLoggedIn } }

function resetLogin(){
    return { type: userConstants.RESET_LOGIN }
}

function userSubscribe(data) {
    return dispatch => {
        return userService.userSubscribe(data).then(_=>dispatch(success_()));
    }
}

function isLoggedIn() {
    return dispatch => {
        const hasKey = hasAuthKey();
        if(hasKey){
            // check if key is valid
            userService.validateAuthKey(getAuthKey())
                       .then(
                            res => {
                                if(!res.data.data){
                                    resetAuthKey();    
                                }
                                dispatch( isLoggedInResult(res) )
                            },
                            error => {
                                console.log(`Error - ${error}`)
                                resetAuthKey();
                                dispatch( isLoggedInResult(false) )
                            })
        } else {
            dispatch( isLoggedInResult(hasKey) )
        }        
    }
}

function login(username, password) {    
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                data => { 
                    sessionStorage.setItem('user', JSON.stringify(data.data.data.user))
                    sessionStorage.setItem('auth_key', data.data.data.auth_key)
                    dispatch(success(data));
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
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('auth_key');

        const hasKey = hasAuthKey();
        dispatch( isLoggedInResult(hasKey) )

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
