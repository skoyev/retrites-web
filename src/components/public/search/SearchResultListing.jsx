import React from 'react';
import { Translate } from "react-localize-redux";
import '../style/SearchResultListing.css'
import { Row } from 'antd';

const SearchResultListing = ({items}) => {

    let chunk = function(myItems, size) {
        if (!myItems || 
                !Array.isArray(myItems)) return [];                
        const firstChunk = myItems.slice(0, size);
        if (!firstChunk.length) {
            return myItems; // this is the base case to terminal the recursive
        }
        return [firstChunk].concat(chunk(myItems.slice(size, myItems.length), size));
    }    

    const countItemPerRow = 4;

    const itemsInRow = chunk(items, countItemPerRow);    

    return (
        <Row>
            {itemsInRow.map((item, index) => (                
                <div>{item.id}</div>
            ))}
        </Row>
    )
}

export default SearchResultListing;