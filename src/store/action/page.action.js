import axios from "axios";
import { client, ROOT_URL } from '.';
import { pageConstants } from '../../constants/page.constants';
import { history } from '../../helpers';

export const pageActions = {
    navigateToPage
};

export function navigateToPage(pageName) {
    return { 
        type: pageConstants.REDIRECT_PAGE,
        pageName: pageName
    }
}
