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

let leads = [];

let searchResult = {
    yoga: [
        {id:1, start_date:"2018/08/01", duration:"8", title_center: 'Center 1', title_bottom: 'Bottom 1', price: '1', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:2, start_date:"2018/08/02", duration:"8",title_center: 'Center 2', title_bottom: 'Bottom 2', price: '3', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:3, start_date:"2018/08/03", duration:"8",title_center: 'Center 3', title_bottom: 'Bottom 3', price: '143', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:4, start_date:"2018/08/04", duration:"8",title_center: 'Center 4', title_bottom: 'Bottom 4', price: '233', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:5, start_date:"2018/08/05", duration:"8",title_center: 'Center 5', title_bottom: 'Bottom 5', price: '643', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:6, start_date:"2018/08/06", duration:"8",title_center: 'Center 6', title_bottom: 'Bottom 6', price: '193', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:7, start_date:"2018/08/07", duration:"8",title_center: 'Center 7', title_bottom: 'Bottom 7', price: '293', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:8, start_date:"2018/08/08", duration:"8",title_center: 'Center 8', title_bottom: 'Bottom 8', price: '143', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:9, start_date:"2018/08/09", duration:"8",title_center: 'Center 9', title_bottom: 'Bottom 9', price: '233', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:10, start_date:"07/08/2018", duration:"8",title_center: 'Center 10', title_bottom: 'Bottom 10', price: '643', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:11, start_date:"07/04/2018", duration:"8",title_center: 'Center 11', title_bottom: 'Bottom 11', price: '193', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:12, start_date:"07/08/2018", duration:"8",title_center: 'Center 12', title_bottom: 'Bottom 12', price: '293', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:13, start_date:"07/02/2018", duration:"8",title_center: 'Center 13', title_bottom: 'Bottom 13', price: '143', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:14, start_date:"07/02/2018", duration:"8",title_center: 'Center 14', title_bottom: 'Bottom 14', price: '233', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:15, start_date:"07/08/2018", duration:"8",title_center: 'Center 15', title_bottom: 'Bottom 15', price: '643', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:16, start_date:"07/08/2018", duration:"8",title_center: 'Center 16', title_bottom: 'Bottom 16', price: '193', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:17, start_date:"07/04/2018", duration:"8",title_center: 'Center 17', title_bottom: 'Bottom 17', price: '293', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:18, start_date:"07/08/2018", duration:"8",title_center: 'Center 18', title_bottom: 'Bottom 18', price: '143', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:19, start_date:"07/08/2018", duration:"8",title_center: 'Center 19', title_bottom: 'Bottom 19', price: '233', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:20, start_date:"07/08/2018", duration:"8",title_center: 'Center 20', title_bottom: 'Bottom 20', price: '643', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:21, start_date:"07/08/2018", duration:"8",title_center: 'Center 1', title_bottom: 'Bottom 21', price: '193', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:22, start_date:"07/08/2018", duration:"8",title_center: 'Center 2', title_bottom: 'Bottom 22', price: '293', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:23, start_date:"07/08/2018", duration:"8",title_center: 'Center 3', title_bottom: 'Bottom 23', price: '143', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:24, start_date:"07/08/2018", duration:"8",title_center: 'Center 4', title_bottom: 'Bottom 24', price: '233', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:25, start_date:"07/08/2018", duration:"8",title_center: 'Center 5', title_bottom: 'Bottom 25', price: '643', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:26, start_date:"07/08/2018", duration:"8",title_center: 'Center 6', title_bottom: 'Bottom 26', price: '193', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:27, start_date:"07/08/2018", duration:"8",title_center: 'Center 7', title_bottom: 'Bottom 27', price: '293', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:28, start_date:"07/08/2018", duration:"8",title_center: 'Center 8', title_bottom: 'Bottom 28', price: '143', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:29, start_date:"07/08/2018", duration:"8",title_center: 'Center 9', title_bottom: 'Bottom 29', price: '233', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:30, start_date:"07/08/2018", duration:"8",title_center: 'Center 10', title_bottom: 'Bottom 30', price: '643', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:31, start_date:"07/08/2018", duration:"8",title_center: 'Center 11', title_bottom: 'Bottom 31', price: '193', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:32, start_date:"07/08/2018", duration:"8",title_center: 'Center 12', title_bottom: 'Bottom 32', price: '293', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:33, start_date:"07/08/2018", duration:"8",title_center: 'Center 13', title_bottom: 'Bottom 33', price: '143', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:34, start_date:"07/08/2018", duration:"8",title_center: 'Center 14', title_bottom: 'Bottom 34', price: '233', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:35, start_date:"07/08/2018", duration:"8",title_center: 'Center 15', title_bottom: 'Bottom 35', price: '$643', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:36, start_date:"07/08/2018", duration:"8",title_center: 'Center 16', title_bottom: 'Bottom 36', price: '193', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:37, start_date:"02/08/2018", duration:"8",title_center: 'Center 17', title_bottom: 'Bottom 37', price: '293', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:38, start_date:"02/08/2018", duration:"8",title_center: 'Center 18', title_bottom: 'Bottom 38', price: '143', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:39, start_date:"02/08/2018", duration:"8",title_center: 'Center 19', title_bottom: 'Bottom 39', price: '233', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'},
        {id:40, start_date:"02/08/2018", duration:"8",title_center: 'Center 20', title_bottom: 'Bottom 40', price: '643', picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'}
    ],
    meditation: [],
}

let summaryReports = [
    {id:1, name: 'Reports By Date', value: '4'},
    {id:2, name: 'Number of visitis', value: '39'},
    {id:3, name: 'Last visit', value: '3/4/2019'}
]

let leadSummary = [
    {id:1, name: 'Total Leads', value: '4'},
    {id:2, name: 'Last Requested Leads', value: '10/10/2018'},
    {id:3, name: 'Last Reviewed Lead', value: 'Test Lead'}
]

let amenitySummary = [
    {id:1, name: 'Total', value: '11'},
    {id:2, name: 'Last Updated', value: 'Test Name'},
    {id:3, name: 'Last Created', value: 'Test Name1'}
]

let retreatByCountries = [
    {id:1, name:'label.bali', picture:'https://retreat.guru/images/locations/bali-temple-medium-wide.jpg'},
    {id:2, name:'label.india', picture:'https://retreat.guru/images/locations/india-temple-arch-medium-wide.jpg'},
    {id:3, name:'label.mexico', picture:'https://retreat.guru/images/locations/mexico-beach-medium-wide.jpg'},                
    {id:4, name:'label.costarica', picture:'https://retreat.guru/images/locations/costa-rica-statue-medium-wide.jpg'},                                
    {id:5, name:'label.peru', picture:'https://retreat.guru/images/locations/peru-machu-picchu-medium-wide.jpg'},                                
    {id:6, name:'label.california', picture:'https://retreat.guru/images/locations/california-yosemite-medium-wide.jpg'},
    {id:7, name:'label.spain', picture:'https://inews.co.uk/wp-content/uploads/2019/06/shutterstock_712575202.jpg'},                                
    {id:8, name:'label.tibet', picture:'http://airtreks-wpengine.netdna-ssl.com/wp-content/uploads/tibetrestrictedtravel-e1472199850587.jpg'}                                
]

let retriteTypes = [
    {id:1, typelink: 'items/yoga', name:'label.yoga', picture:'https://s3-us-west-2.amazonaws.com/prod.retreat.guru/assets/categories/176466/medium-wide/Yoga.jpg'},
    {id:2, typelink: 'items/plantmedicine', name:'label.plantmedicine', picture:'https://s3-us-west-2.amazonaws.com/prod.retreat.guru/images/4314/medium-wide/ayahuasca-crop.jpg'},
    {id:3, typelink: 'items/meditation', name:'label.meditation', picture:'https://s3-us-west-2.amazonaws.com/prod.retreat.guru/assets/categories/176464/medium-wide/Meditation.jpg'},                
    {id:4, typelink: 'items/nutrition', name:'label.nutrition', picture:'https://s3-us-west-2.amazonaws.com/prod.retreat.guru/assets/categories/176465/medium-wide/Nutrition.jpg'},                                
    {id:5, typelink: 'items/artscreativitymovement', name:'label.artscreativitymovement', picture:'https://s3-us-west-2.amazonaws.com/prod.retreat.guru/assets/categories/228634/medium-wide/iStock-821832920.jpg'},                                
    {id:6, typelink: 'items/adventure', name:'label.adventure', picture:'https://s3-us-west-2.amazonaws.com/prod.retreat.guru/assets/categories/176462/medium-wide/Adventure.jpg'},
    {id:7, typelink: 'items/massage', name:'label.massage', picture:'https://d3i11hp0zpbt87.cloudfront.net/media/W1siZiIsIjIwMTcvMDgvMjIvOGhxejd3bGFpdV9UaGlua3N0b2NrUGhvdG9zXzYzNjU2NTY2Ni5qcGciXSxbInAiLCJ0aHVtYiIsIjEyNDB4NjQwIyJdXQ?basename=Healing+Through+Massage&sha=4df29a0539e84518'},
    {id:8, typelink: 'items/cleansing', name:'label.cleansing', picture:'https://cdn.shopify.com/s/files/1/0795/1583/products/celery-detox_573568f0-3fc9-4041-9b25-e08ee392d743.jpg?v=1545264084'}                                
];


function getRetriteTypes(resolve, reject, url, opts) {
    resolve({ ok: true, retriteTypes: retriteTypes });
}

function getItemsByCountries(resolve, reject, url, opts) {
    resolve({ ok: true, retreatByCountries: retreatByCountries });
}

function updateItem(resolve, reject, url, opts) {
    let params = JSON.parse(opts.body);
    let id = params.id;
    if(!id){
        console.log('id is null');
        resolve({ ok: false });
    }
    let foundItem = items.filter(c => c.id === id)[0];
    if(foundItem){
        foundItem.name = params.name;
        foundItem.email = params.email;
        foundItem.description = params.description;

    }        
    resolve({ ok: true });
}

function getReportSummary(resolve, reject, url, opts) {
    resolve({ ok: true, summaryReports: summaryReports });
}

function getLeadsSummary(resolve, reject, url, opts) {
    resolve({ ok: true, leadSummary: leadSummary });
}

function getAmenitySummary(resolve, reject, url, opts) {
    resolve({ ok: true, amenitySummary: amenitySummary });
}

function getItems(resolve, reject, url, opts) {
    resolve({ status: 200, data: {items:items} });
}

function getLeads(resolve, reject, url, opts) {
    resolve({ ok: true, leads: leads });
}

function createLead(resolve, reject, url, opts) {
    let id = leads.length > 0 ? leads.map(i => i.id).reduce((prev, curr) => prev > curr ? prev : curr) : 1;
    let params = JSON.parse(opts.body);

    let lead = {
        id   : ++id, 
        name : params.name, 
        details: params.details, 
        email: params.email,
        status: 'New',
        postedDate: new Date().toLocaleDateString()
    };

    leads.push(lead)

    resolve({ ok: true });
}

function deleteLead(resolve, reject, url, opts) {
    let id = parseInt(url.split('/')[2]);
    if(id){
        leads = leads.filter(c => c.id !== id);    
        resolve({ ok: true });    
    } else {
        console.log('Error delete lead')
        resolve({ ok: false });    
    } 
}

function deleteItem(resolve, reject, url, opts) {
    let id = parseInt(url.split('/')[2]);
    if(id){
        var item = items.filter(c => c.id === id)[0];
        var index = items.indexOf(item);
        
        if (index > -1) {
            items.splice(index, 1);
        }        
    
        resolve({ ok: true });    
    } else {
        console.log('Error delete item')
        resolve({ ok: false });    
    } 
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
    let priceFrom = data[4].split('=')[1];    
    let priceTo = data[5].split('=')[1];    
    let fromDate = data[6].split('=')[1];    
    let toDate = data[7].split('=')[1];    

    if(type && count && startFrom){        
        let res = searchResult[type].filter(item => {
            let resSearch = true;
            if(name) {
                resSearch = item.title_center.includes(name);
            }

            if(priceFrom && priceTo){
                resSearch = (parseInt(item.price) >= parseInt(priceFrom)) && (parseInt(item.price) <= parseInt(priceTo));
            }

            if(fromDate && toDate){
                let start_date = new Date(item.start_date).getTime();
                let from = new Date(fromDate).getTime();
                let to = new Date(toDate).getTime();
                console.log(start_date >= from);
                console.log(start_date <= to);
                resSearch = start_date >= from && start_date <= to;
            }

            return resSearch;
        }).slice(0, (parseInt(count) + parseInt(startFrom)));

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

                // get retrite types
                if (url.includes('/items/retritetypes') && opts.method === 'GET') {                    
                    getRetriteTypes(resolve, reject, url, opts)
                    return;
                }

                // get items by countries
                if (url.includes('/items/bycountries') && opts.method === 'GET') {                    
                    getItemsByCountries(resolve, reject, url, opts)
                    return;
                }

                // report summary
                if (url.includes('/report/summary') && opts.method === 'GET') {                    
                    getReportSummary(resolve, reject, url, opts)
                    return;
                }

                // lead summary
                if (url.includes('/leads/summary') && opts.method === 'GET') {                    
                    getLeadsSummary(resolve, reject, url, opts)
                    return;
                }

                // amenity summary
                if (url.includes('/amenity/summary') && opts.method === 'GET') {                    
                    getAmenitySummary(resolve, reject, url, opts)
                    return;
                }

                // get item by id
                if (url.includes('/items/') && opts.method === 'GET' 
                        && !isNaN(parseInt(url.split('/')[2])) ) {                    
                    getItemById(resolve, reject, url, opts)
                    return;
                }

                // update item
                if (url.endsWith('/items') && opts.method === 'PUT') {                    
                    updateItem(resolve, reject, url, opts)
                    return;
                }

                // delete item
                if (url.startsWith('/items') && opts.method === 'DELETE') {                    
                    deleteItem(resolve, reject, url, opts)
                    return;
                }

                // get items
                if (url.includes('/api/item?') && opts.method === 'GET') {                    
                    getItems(resolve, reject, url, opts)
                    return;
                }

                // get leads
                if (url.endsWith('/leads') && opts.method === 'GET') {                    
                    getLeads(resolve, reject, url, opts)
                    return;
                }

                // create lead
                if (url.endsWith('/leads') && opts.method === 'POST') {                    
                    createLead(resolve, reject, url, opts)
                    return;
                }

                // delete lead
                if (url.startsWith('/leads') && opts.method === 'DELETE') {                    
                    deleteLead(resolve, reject, url, opts)
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