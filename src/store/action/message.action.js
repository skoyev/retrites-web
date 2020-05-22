import { messageService } from '../../services';
import { messageConstants } from '../../constants';

export const messageActions = {
};

function success(type, data) { return { type: type, data } }
function failure(type, error) { return { type: type, error } }