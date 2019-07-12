import { userConstants } from '../../constants';
import { userService } from '../../services';
import { history } from '../../helpers';

export const userActions = {
    login,
    logout,
    register
};

function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/dashboard');
                },
                error => {
                    dispatch(failure(error));                    
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
                    dispatch(success());
                    history.push('/');
                    //dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error));
                    //dispatch(alertActions.error(error));
                }
            );
    };
}
