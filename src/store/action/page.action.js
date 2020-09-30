import { pageConstants } from '../../constants/page.constants';

export const pageActions = {
    navigateToPage
};

export function navigateToPage(pageName) {
    return { 
        type: pageConstants.REDIRECT_PAGE,
        pageName: pageName
    }
}
