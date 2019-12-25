import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export const chunk = function(myItems, size) {
    if (!myItems || 
            !Array.isArray(myItems)) return [];                
    const firstChunk = myItems.slice(0, size);
    if (!firstChunk.length) {
        return myItems; // this is the base case to terminal the recursive
    }
    return [firstChunk].concat(chunk(myItems.slice(size, myItems.length), size));
}

export const validateEmail = (email) => {
    if(!email) {
        console.warn(`validateEmail is invalid for ${email}`)
        return false;
    }

    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return new RegExp(re).test(email);
}