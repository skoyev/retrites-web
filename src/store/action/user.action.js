import { userConstants } from '../../constants';
import { userService } from '../../services';
import { history, hasAuthKey, getAuthKey, resetAuthKey, setSessionData, 
         AUTH_KEY, USER_KEY, removeSessionAttribute } from '../../helpers';

export const userActions = {
    login,
    logout,
    register,
    resetLogin,
    isLoggedIn,
    userSubscribe,
    isUserEmailAlreadyRegistered
};

function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
function success_() { return { type: userConstants.SUCCESS } }
function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }

function createUserSuccess(shouldRedirectHomePage) { return { type: userConstants.CREATE_USER_SUCCESS, shouldRedirectHomePage } }
function createUserFailure(error) { return { type: userConstants.CREATE_USER_FAILURE, error } }
function isUserEmailAlreadyRegisteredResult(result) { return { type: userConstants.IS_USER_ALREADY_REGISTERED, result } }

function isLoggedInResult(isLoggedIn) { return { type: userConstants.IS_LOGGED_IN, isLoggedIn } }

function resetLogin(){
    return { type: userConstants.RESET_LOGIN }
}

function userSubscribe(data) {
    return dispatch => {
        return userService.userSubscribe(data).then(_=>dispatch(success_()));
    }
}

/**
 * Check is email already exist/taken
 * @param {*} email 
 */
function isUserEmailAlreadyRegistered(email) {
    return dispatch => {
        userService.isUserEmailAlreadyRegistered(email)
                   .then( res   => dispatch( isUserEmailAlreadyRegisteredResult(res.data.data) ),
                          error => dispatch( isUserEmailAlreadyRegisteredResult(false) )
                        )
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
                                dispatch( isLoggedInResult(res.data.data) )
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

function login(email, password, activateCode) {    
    return dispatch => {
        dispatch(request({ email }));

        userService.login(email, password, activateCode)
            .then(
                data => { 
                    setSessionData(AUTH_KEY, data.data.data['x-auth-key'])
                    setSessionData(USER_KEY, JSON.stringify(data.data.data.user))

                    //sessionStorage.setItem('user', JSON.stringify(data.data.data.user))
                    //sessionStorage.setItem('auth_key', data.data.data['x-auth-key'])

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

        removeSessionAttribute(AUTH_KEY);
        removeSessionAttribute(USER_KEY);

        //sessionStorage.removeItem('user');
        //sessionStorage.removeItem('auth_key');

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
