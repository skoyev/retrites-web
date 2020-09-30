import {itemConstants, pageConstants, commonConstants} from '../../constants';

const INITIAL_STATE = {
  items: [],
  shouldReloadItems: false,
  summaryAmenity: [],
  retreatByCountries: [],
  retriteTypes: [],
  pageName: '',
  searchLength: ['Any','3', '7', '14', '14>']
};

const itemFetchSuccess = (state, action) => {
  return {
    ...state,
    pageName: '',
    items: action.items
  };
}

export function items(state = INITIAL_STATE, action) {
    switch (action.type) {
        case itemConstants.ITEMS_FETCH_SUCCESS 
              || itemConstants.SUMMARY_FETCH_SUCCESS:
          return itemFetchSuccess(state, action);
        
        case itemConstants.ITEM_FETCH_SUCCESS:
          return {
            ...state,
            pageName: '',
            item: action.item
          }; 
          
        case itemConstants.FETCH_RETRITE_BY_COUNTRY_SUCCESS:
          return {
            ...state,
            pageName: '',
            retreatByCountries: action.retreatByCountries ? action.retreatByCountries.map(d => {
              return {id : d.id, name : `label.${d.name.toLowerCase()}`, type: `${d.name.toLowerCase().replace(" ", "-")}`, picture : d.picture};
            }) : []
          }

        case itemConstants.FETCH_RETRITE_TYPES_SUCCESS:
          return {
            ...state,
            pageName: '',
            retriteTypes: action.retriteTypes ? action.retriteTypes.map(d => {
              return {id : d.id, name : `label.${d.name.toLowerCase()}`, type: `${d.name.toLowerCase().replace(" ", "-")}`, picture : d.picture};
            }) : []
          }

        case pageConstants.CLEAR_ITEMS_AND_REDIRECT_PAGE:
          return {
            ...state,
            items: [],
            pageName: action.pageName
          }

        case itemConstants.DELETE_ITEM_SUCCESS: 
          return {
            ...state,
            items: state.items.filter(i => i.id !== action.id)
          }

        case itemConstants.ADD_ITEM_SUCCESS:
          return {
            ...state,
            items: [...state.items, action.item ]
          }

        case itemConstants.UPDATE_ITEM_SUCCESS:
            //console.log(action.item.get('name'))
            return {
              ...state,
              items: state.items ? state.items.map(i => 
                            i.id == action.item.get('id') ? 
                            {...i, 
                              name:  action.item.get('name'), 
                              title: action.item.get('title'), 
                              description: action.item.get('description'),
                              facilitators: JSON.parse(action.item.get('facilitators')),
                              document: JSON.parse(action.item.get('document')),
                              events: JSON.parse(action.item.get('events')),
                              currency: action.item.get('currency'),
                              duration: action.item.get('duration'),
                              city: action.item.get('city'),
                              picture: action.item.get('picture'),
                              address: action.item.get('address')
                            }
                        : i) : []
            }
            default:
          return state
    }
}