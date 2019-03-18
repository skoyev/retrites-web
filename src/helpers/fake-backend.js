// array in local storage for registered users
let users = JSON.parse(localStorage.getItem('users')) || [];
let items = [        
    {id:6, name:'name6BE', description: '', price: 12, currency: '$', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/200766/medium/IMG_2079.jpg', location:''},
    {id:1, name:'28 Days Meditation Teacher Training Rishikesh', description: 'Ongoing package (28 days / 27 nights) 300 Hours / 28 Days Meditation Teacher Training Rishikesh IndiaShree Mahesh Heritage ,Govt of India registered ', price: 12, currency: '$', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142259/medium/IMG_20170809_102212_755.jpg', location:'Rishikesh Uttarakhand India'},
    {id:2, name:'name2', description: '', price: 12, currency: '$', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg', location:''},
    {id:3, name:'name3', description: '', price: 12, currency: '$', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/181425/medium/IMG_1397.jpg', location:''},
    {id:4, name:'name4', description: '', price: 12, currency: '$', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/190539/medium/Surf%20Dominical%20Costa%20Rica%20.jpg', location:''},
    {id:5, name:'name5', description: '', price: 12, currency: '$', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/181360/medium/Shata-Group-RainTree.jpg', location:''}    
];

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
    
export function configureFakeBackend() {
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {
                // get items
                if (url.endsWith('/items') && opts.method === 'GET') {                    
                    getItems(resolve, reject, url, opts)
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