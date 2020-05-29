import { messageService } from '../../services';
import { messageConstants } from '../../constants';

export const messageActions = {
    fetchMessageGroups,
    fetchMessagesByGroupID
};

function success(type, data) { return { type: type, data } }
function failure(type, error) { return { type: type, error } }

function fetchMessageGroups() {
    return dispatch => {
        return messageService.fetchMessageGroups()
                             .then(res => dispatch(success(messageConstants.FETCH_MESSAGE_GROUPS_SUCCESS ,res.data)))
                             .catch(error => {throw (error)})
    }
}

function fetchMessagesByGroupID(msgGroupID) {
    if(msgGroupID){
        return dispatch => {
            return messageService.fetchMessagesByGroupID(msgGroupID)
                                 .then(res => dispatch(success(messageConstants.FETCH_MESSAGES_SUCCESS ,res.data)))
                                 .catch(error => {throw (error)})
        }           
    } else {
        return dispatch => { failure(messageConstants.FETCH_MESSAGES_FAILED, 'msgGroupID is null'); };
    }
}