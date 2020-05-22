import {messageConstants} from '../../constants';

const INITIAL_STATE = {
    messages:[
            {
              id: 1,
              name: 'John Brown',
              age: 32,
              address: 'New York No. 1 Lake Park',
            },
            {
              id: 2,
              name: 'Jim Green',
              age: 42,
              address: 'London No. 1 Lake Park',
            },
            {
              id: 3,
              name: 'Jim1 Green',
              age: 423,
              address: 'London1 No. 1 Lake Park',
            },        
            {
              id: 4,
              name: 'Jim22 Green',
              age: 32,
              address: 'London No. 2 Lake Park',
            },        
            {
              id: 5,
              name: 'Jim2 Green',
              age: 32,
              address: 'London No. 44 Lake Park',
            },        
            {
              id: 6,
              name: 'Jim 22 Green',
              age: 2,
              address: 'London No. 12 Lake Park',
            }        
    ]
};

export function message(state = INITIAL_STATE, action) {
    switch (action.type) {
        default:
          return state
    }
}