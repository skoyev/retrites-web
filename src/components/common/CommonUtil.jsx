export const isExpiredUser = (user) => {
    if(user && user.billing_expires_at) {
        // check if date is withing next 7 days.
        let expDate  = Date.parse(user.billing_expires_at);
        var today    = new Date();
        var nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7).getTime();             
        return nextweek >= expDate;
    } else {
        return false;
    }        
}