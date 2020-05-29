import {messageConstants} from '../../constants';

const INITIAL_STATE = {
    messageGroups: [],
    messages: []
};

export function message(state = INITIAL_STATE, action) {
    switch (action.type) {
      case messageConstants.FETCH_MESSAGE_GROUPS_SUCCESS:
        return {
          ...state,
          messageGroups: action.data.messageGroups
        }; 

      case messageConstants.FETCH_MESSAGES_SUCCESS:
        return {
          ...state,
          messages: action.data.messages
        }; 

      default:
        return state
    }
}