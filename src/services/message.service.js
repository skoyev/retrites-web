import axios from 'axios';
import { getAuthKey } from '../helpers';
const URL = '/api/common';

export const messageService = {
    fetch
};

function fetch() {
    return axios.get(`${URL}/message`);
}