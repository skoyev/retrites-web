export const commonConstants = {
    GET_COUNTRIES: 'get-countries',
    FETCH_CATEGORIES_SUCCESS: 'FETCH_CATEGORIES_SUCCESS',
    FETCH_SUB_CATEGORIES_SUCCESS: 'FETCH_SUB_CATEGORIES_SUCCESS',
    ADD_SELECTED_ITEM_INTO_STORE: 'ADD_SELECTED_ITEM_INTO_STORE',
    FETCH_COUNTRIES_SUCCESS: 'FETCH_COUNTRIES_SUCCESS',
    SET_SELECTED_ITEM_FIELD: 'SET_SELECTED_ITEM_FIELD',
    IS_NEXT_STEP_VALID: 'IS_NEXT_STEP_VALID',
    FETCH_FASCILITATOR_TYPES_SUCCESS: 'FETCH_FASCILITATOR_TYPES_SUCCESS',
    SEND_EMAIL_SUCCESS: 'SEND_EMAIL_SUCCESS',
    FETCH_ITEM_TYPES_SUCCESS: 'FETCH_ITEM_TYPES_SUCCESS',
    IS_LOADING_SUCCESS: 'IS_LOADING_SUCCESS',
    
    ADD: 'ADD',
    SIGN_UP: 'SIGN_UP',
    LOGIN: 'LOGIN',
    SUBSCRIBE: 'SUBSCRIBE',
    REGISTER_PAGE_LINK: '/register',
    LOGIN_PAGE_LINK: '/login',
    HOME_PAGE_LINK: '/home',
    ADD_PAGE_LINK: '/add',
    ITEMS_PAGE_LINK: '/items',
    ABOUT_PAGE_LINK: '/about',
    DASHBOARD_PAGE_LINK: '/dashboard',
    SECRET_PASSPHRASE: 'love',

    STATUS_CREATED: 201,

    START_LOADING: true,
    END_LOADING: false,

    PUBLIC_USER_ROLE: 'public',
    OWNER_USER_ROLE: 'owner',
    PUBLIC_USER_ROLE_MENU: [{name: 'Dashboard', type: 'dashboard', index: 'view-dashboard'}, {name: 'Messages', type: 'user', index: 'view-messages'}],
    OWNER_USER_ROLE_MENU: [{name: 'Dashboard', type: 'dashboard', index: 'view-dashboard'}, {name: 'Amentities', type: 'laptop', index: 'view-amentities'}, {name: 'Messages', type: 'user', index: 'view-messages'}, {name: 'Statistics/Activity', type: 'notification', index: 'view-report'}],
    ADMIN_USER_ROLE_MENU: [{name: 'Users', type: 'user', index: 'view-users'}, {name: 'Items', type: 'laptop', index: 'view-items'}],
    USER_ROLES: [{id:1, name:'Search And Attend Event(s)', role: 'public'}, {id:2, name:'Host Event(s)', role: 'owner'}],

    FORGOT_PASSWORD_SUCCESS: 'FORGOT_PASSWORD_SUCCESS',
    FORGOT_PASSWORD_FAILURE: 'FORGOT_PASSWORD_FAILURE',

    RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS',
    RESET_PASSWORD_FAILURE: 'RESET_PASSWORD_FAILURE'
};