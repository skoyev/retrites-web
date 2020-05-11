import { userConstants } from '../../constants';

const INITIAL_STATE = {
  users: [],
  shouldRedirectHomePage: false,
  isLoggedIn: false,
  userRegisterError: '',
  error: '',
  isUserAlreadyRegisteredEmail: false
};

export function users(state = INITIAL_STATE, action) {
    switch (action.type) {
      case userConstants.IS_USER_ALREADY_REGISTERED:
        return {
          ...state,
          isUserAlreadyRegisteredEmail: action.result
        };       
      case userConstants.IS_LOGGED_IN:
          return {
            ...state,
            isLoggedIn: action.isLoggedIn
          };       
        case userConstants.GETALL_REQUEST:
          return {
            loading: true
          };
        case userConstants.GETALL_SUCCESS:
          return {
            items: action.users
          };
        case userConstants.GETALL_FAILURE:
          return { 
            error: action.error
          };
        case userConstants.DELETE_REQUEST:
          // add 'deleting:true' property to user being deleted
          return {
            ...state,
            items: state.items.map(user =>
              user.id === action.id
                ? { ...user, deleting: true }
                : user
            )
          };
        case userConstants.DELETE_SUCCESS:
          // remove deleted user from state
          return {
            items: state.items.filter(user => user.id !== action.id)
          };
        case userConstants.DELETE_FAILURE:
          // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
          return {
            ...state,
            items: state.items.map(user => {
              if (user.id === action.id) {
                // make copy of user without 'deleting:true' property
                const { deleting, ...userCopy } = user;
                // return copy of user with 'deleteError:[error]' property
                return { ...userCopy, deleteError: action.error };
              }
    
              return user;
            })
          };

        case userConstants.LOGIN_FAILURE:
          return {
            error: action.error
          };

        case userConstants.CREATE_USER_SUCCESS:
          return {
            ...state,
            userRegisterError: '',
            shouldRedirectHomePage: action.shouldRedirectHomePage
          };          

        case userConstants.CREATE_USER_FAILURE:
            return {
              ...state,
              shouldRedirectHomePage: false,
              userRegisterError: action.error
            };  
            
        case userConstants.RESET_LOGIN:
            return {
              ...state,
              error: ''
            };

        case userConstants.LOGIN_SUCCESS:
            return {
              ...state,
              isLoggedIn: true,
              error: ''
            };                

        default:
          return {
            ...state
          }
    }
}