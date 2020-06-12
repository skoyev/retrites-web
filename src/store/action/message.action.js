import { messageService } from '../../services';
import { messageConstants, commonConstants } from '../../constants';

export const messageActions = {
    fetchMessageGroups,
    fetchMessagesByGroupID,
    createMessage,
    createMessageGroupAndMessage
};

function success(type, data) { return { type: type, data } }
function failure(type, error) { return { type: type, error } }
function loading(isLoading) { return { type: commonConstants.IS_LOADING_SUCCESS, isLoading } }

/**
 * Create message group and message.
 */
function createMessageGroupAndMessage(itemID, details) {
    if(itemID && details){        
        return dispatch => {
            messageService.createMessageGroup(itemID)
                          .then(res => {
                            if(res.status == commonConstants.STATUS_CREATED){
                                messageService.createMessage(details, res.data.data)
                                              .then(_ => dispatch => failure(messageConstants.CREATE_MESSAGE_SUCCESS))
                                              .catch(_ => dispatch => failure(messageConstants.CREATE_MESSAGE_FAILURE));
                            } else {
                                dispatch(failure(messageConstants.CREATE_MESSAGE_GROUP_FAILURE));
                            }
                          })
                          .catch(_ => dispatch(failure(messageConstants.CREATE_MESSAGE_GROUP_FAILURE)));
        }
    } else {
        return dispatch => failure(messageConstants.CREATE_MESSAGE_GROUP_FAILURE)
    }
}

/**
 * Create a new message (content, msgGroupID)
 */
function createMessage(message, msgGroupID){
    if(message && msgGroupID){        
        return dispatch => {
            dispatch(loading(commonConstants.START_LOADING));
            return messageService.createMessage(message, msgGroupID)
                                 .then(res => {
                                     if(res.status == commonConstants.STATUS_CREATED)
                                        dispatch(fetchMessagesByGroupID(msgGroupID))
                                     else
                                        dispatch(failure(messageConstants.CREATE_MESSAGE_FAILURE ,res.data))

                                     dispatch(loading(commonConstants.END_LOADING));
                                    })
                                 .catch(error => {throw (error)})
        }    
    } else {
        return dispatch => failure(messageConstants.CREATE_MESSAGE_FAILURE)
    }
}

/**
 * Fetch Message Groups.
 */
function fetchMessageGroups() {
    return dispatch => {
        dispatch(loading(commonConstants.START_LOADING));
        return messageService.fetchMessageGroups()
                             .then(res => {
                                 dispatch(success(messageConstants.FETCH_MESSAGE_GROUPS_SUCCESS ,res.data));
                                 dispatch(loading(commonConstants.END_LOADING));
                             })
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