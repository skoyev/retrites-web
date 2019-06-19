// array in local storage for registered users
let users = JSON.parse(localStorage.getItem('users')) || [];
let items = [        
    {id:6, name:'name6', title: 'Title 6', description: 'Ongoing package (28 days / 27 nights) 300 Hours / 28 Days Meditation Teacher Training Rishikesh IndiaShree Mahesh Heritage ,Govt of India registered', price: 12, currency: '$', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/200766/medium/IMG_2079.jpg', location:''},
    {id:1, name:'28 Days Meditation', title: 'Title 1', description: 'Ongoing package (28 days / 27 nights) 300 Hours / 28 Days Meditation Teacher Training Rishikesh IndiaShree Mahesh Heritage ,Govt of India registered ', price: 12, currency: '$', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142259/medium/IMG_20170809_102212_755.jpg', location:'Rishikesh Uttarakhand India'},
    {id:2, name:'name2', title: 'Title 2', description: 'Ongoing package (28 days / 27 nights) 300 Hours / 28 Days Meditation Teacher Training Rishikesh IndiaShree Mahesh Heritage ,Govt of India registered', price: 12, currency: '$', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg', location:''},
    {id:3, name:'name3', title: 'Title 3', description: 'Ongoing package (28 days / 27 nights) 300 Hours / 28 Days Meditation Teacher Training Rishikesh IndiaShree Mahesh Heritage ,Govt of India registered', price: 12, currency: '$', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/181425/medium/IMG_1397.jpg', location:''},
    {id:4, name:'name4', title: 'Title 4', description: 'Ongoing package (28 days / 27 nights) 300 Hours / 28 Days Meditation Teacher Training Rishikesh IndiaShree Mahesh Heritage ,Govt of India registered', price: 12, currency: '$', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/190539/medium/Surf%20Dominical%20Costa%20Rica%20.jpg', location:''},
    {id:5, name:'name5', title: 'Title 5', description: 'Ongoing package (28 days / 27 nights) 300 Hours / 28 Days Meditation Teacher Training Rishikesh IndiaShree Mahesh Heritage ,Govt of India registered', price: 12, currency: '$', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/181360/medium/Shata-Group-RainTree.jpg', location:''},    
    {id:7, name:'name7', title: 'Title 7', description: 'Ongoing package (28 days / 27 nights) 300 Hours / 28 Days Meditation Teacher Training Rishikesh IndiaShree Mahesh Heritage ,Govt of India registered', price: 12, currency: '$', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/181360/medium/Shata-Group-RainTree.jpg', location:''},    
    {id:8, name:'name8', title: 'Title 8', description: 'Ongoing package (28 days / 27 nights) 300 Hours / 28 Days Meditation Teacher Training Rishikesh IndiaShree Mahesh Heritage ,Govt of India registered', price: 12, currency: '$', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/181425/medium/IMG_1397.jpg', location:''},
];

let searchResult = {
    yoga: [
        {id:1, title_center: 'Center 1', title_bottom: 'Bottom 1', price: '$193 per course', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:2, title_center: 'Center 2', title_bottom: 'Bottom 2', price: '$293 per course', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:3, title_center: 'Center 3', title_bottom: 'Bottom 3', price: '$143 per course', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:4, title_center: 'Center 4', title_bottom: 'Bottom 4', price: '$233 per course', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:5, title_center: 'Center 5', title_bottom: 'Bottom 5', price: '$643 per course', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:6, title_center: 'Center 6', title_bottom: 'Bottom 6', price: '$193 per course', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:7, title_center: 'Center 7', title_bottom: 'Bottom 7', price: '$293 per course', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:8, title_center: 'Center 8', title_bottom: 'Bottom 8', price: '$143 per course', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:9, title_center: 'Center 9', title_bottom: 'Bottom 9', price: '$233 per course', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:10, title_center: 'Center 10', title_bottom: 'Bottom 10', price: '$643 per course', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:11, title_center: 'Center 11', title_bottom: 'Bottom 11', price: '$193 per course', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:12, title_center: 'Center 12', title_bottom: 'Bottom 12', price: '$293 per course', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:13, title_center: 'Center 13', title_bottom: 'Bottom 13', price: '$143 per course', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:14, title_center: 'Center 14', title_bottom: 'Bottom 14', price: '$233 per course', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:15, title_center: 'Center 15', title_bottom: 'Bottom 15', price: '$643 per course', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:16, title_center: 'Center 16', title_bottom: 'Bottom 16', price: '$193 per course', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:17, title_center: 'Center 17', title_bottom: 'Bottom 17', price: '$293 per course', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:18, title_center: 'Center 18', title_bottom: 'Bottom 18', price: '$143 per course', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:19, title_center: 'Center 19', title_bottom: 'Bottom 19', price: '$233 per course', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:20, title_center: 'Center 20', title_bottom: 'Bottom 20', price: '$643 per course', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:21, title_center: 'Center 1', title_bottom: 'Bottom 21', price: '$193 per course', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:22, title_center: 'Center 2', title_bottom: 'Bottom 22', price: '$293 per course', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:23, title_center: 'Center 3', title_bottom: 'Bottom 23', price: '$143 per course', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:24, title_center: 'Center 4', title_bottom: 'Bottom 24', price: '$233 per course', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:25, title_center: 'Center 5', title_bottom: 'Bottom 25', price: '$643 per course', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:26, title_center: 'Center 6', title_bottom: 'Bottom 26', price: '$193 per course', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:27, title_center: 'Center 7', title_bottom: 'Bottom 27', price: '$293 per course', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:28, title_center: 'Center 8', title_bottom: 'Bottom 28', price: '$143 per course', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:29, title_center: 'Center 9', title_bottom: 'Bottom 29', price: '$233 per course', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:30, title_center: 'Center 10', title_bottom: 'Bottom 30', price: '$643 per course', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:31, title_center: 'Center 11', title_bottom: 'Bottom 31', price: '$193 per course', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:32, title_center: 'Center 12', title_bottom: 'Bottom 32', price: '$293 per course', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:33, title_center: 'Center 13', title_bottom: 'Bottom 33', price: '$143 per course', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:34, title_center: 'Center 14', title_bottom: 'Bottom 34', price: '$233 per course', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:35, title_center: 'Center 15', title_bottom: 'Bottom 35', price: '$643 per course', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:36, title_center: 'Center 16', title_bottom: 'Bottom 36', price: '$193 per course', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:37, title_center: 'Center 17', title_bottom: 'Bottom 37', price: '$293 per course', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:38, title_center: 'Center 18', title_bottom: 'Bottom 38', price: '$143 per course', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:39, title_center: 'Center 19', title_bottom: 'Bottom 39', price: '$233 per course', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:40, title_center: 'Center 20', title_bottom: 'Bottom 40', price: '$643 per course', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'}
    ],
    meditation: [],
}

function getItems(resolve, reject, url, opts) {
    resolve({ ok: true, items: items });
}

function createItem(resolve, reject, url, opts){
    let id = items.map(i => i.id).reduce((prev, curr) => prev > curr ? prev : curr);
    //console.log(id)
    let params = JSON.parse(opts.body);

    let item = {
        id   : ++id, 
        name : params.name, 
        description: params.description, 
        price: params.price, 
        currency: params.currency, 
        picture: params.picture, 
        location: params.location};

    items.push(item)
    resolve({ ok: true });
}

function getItemById(resolve, reject, url, opts){
    let id = parseInt(url.split('/')[2]);
    if(id){
        let item = items.find(i => i.id === id)
        resolve({ ok: true, item: item });
    } else {
        reject('ID is null')
    }
}

function getItemsByType(resolve, reject, url, opts){
    let data = url.split('?')[1].split('&');
    let type = data[0].split('=')[1];
    let count = data[1].split('=')[1];    
    let startFrom = data[2].split('=')[1];    
    let name = data[3].split('=')[1];    

    if( type && count && startFrom){
        let res = []
        if(name){
            res = searchResult[type].filter(item => item.title_center.includes(name))
            if(res && res.length > 0) {
                res = res.slice(0, (parseInt(count) + parseInt(startFrom)));    
            }
        } else {
            res = searchResult[type].slice(0, (parseInt(count) + parseInt(startFrom)));
        }        
        resolve({ ok: true, items: res });
    } else {
        reject('Type is null');
    }
}
    
export function configureFakeBackend() {
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {
                // get item by id
                if (url.includes('/items/') && opts.method === 'GET' 
                        && !isNaN(parseInt(url.split('/')[2])) ) {                    
                    getItemById(resolve, reject, url, opts)
                    return;
                }

                // get items
                if (url.endsWith('/items') && opts.method === 'GET') {                    
                    getItems(resolve, reject, url, opts)
                    return;
                }

                // search items by type
                if(url.includes('/items?type=') && opts.method === 'GET') {
                    getItemsByType(resolve, reject, url, opts);
                    return;
                }

                // create item/retrite
                if (url.endsWith('/items') && opts.method === 'POST') {                    
                    createItem(resolve, reject, url, opts)
                    return;
                }

                // authenticate
                if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
                    // get parameters from post request
                    let params = JSON.parse(opts.body);

                    // find if any user matches login credentials
                    let filteredUsers = users.filter(user => {
                        return user.username === params.username && user.password === params.password;
                    });

                    if (filteredUsers.length) {
                        // if login details are valid return user details and fake jwt token
                        let user = filteredUsers[0];
                        let responseJson = {
                            id: user.id,
                            username: user.username,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            token: 'fake-jwt-token'
                        };
                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(responseJson)) });
                    } else {
                        // else return error
                        reject('Username or password is incorrect');
                    }

                    return;
                }

                // get users
                if (url.endsWith('/users') && opts.method === 'GET') {
                    // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(users))});
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }

                    return;
                }

                // get user by id
                if (url.match(/\/users\/\d+$/) && opts.method === 'GET') {
                    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                        // find user by id in users array
                        let urlParts = url.split('/');
                        let id = parseInt(urlParts[urlParts.length - 1]);
                        let matchedUsers = users.filter(user => { return user.id === id; });
                        let user = matchedUsers.length ? matchedUsers[0] : null;

                        // respond 200 OK with user
                        resolve({ ok: true, text: () => JSON.stringify(user)});
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }

                    return;
                }

                // register user
                if (url.endsWith('/users/register') && opts.method === 'POST') {
                    // get new user object from post body
                    let newUser = JSON.parse(opts.body);

                    // validation
                    let duplicateUser = users.filter(user => { return user.username === newUser.username; }).length;
                    if (duplicateUser) {
                        reject('Username "' + newUser.username + '" is already taken');
                        return;
                    }

                    // save new user
                    newUser.id = users.length ? Math.max(...users.map(user => user.id)) + 1 : 1;
                    users.push(newUser);
                    localStorage.setItem('users', JSON.stringify(users));

                    // respond 200 OK
                    resolve({ ok: true, text: () => Promise.resolve() });

                    return;
                }

                // delete user
                if (url.match(/\/users\/\d+$/) && opts.method === 'DELETE') {
                    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                        // find user by id in users array
                        let urlParts = url.split('/');
                        let id = parseInt(urlParts[urlParts.length - 1]);
                        for (let i = 0; i < users.length; i++) {
                            let user = users[i];
                            if (user.id === id) {
                                // delete user
                                users.splice(i, 1);
                                localStorage.setItem('users', JSON.stringify(users));
                                break;
                            }
                        }

                        // respond 200 OK
                        resolve({ ok: true, text: () => Promise.resolve() });
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }

                    return;
                }

                // pass through any requests not handled above
                realFetch(url, opts).then(response => resolve(response));

            }, 500);
        });
    }
}