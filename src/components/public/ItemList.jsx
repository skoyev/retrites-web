import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

const style = {
    marginBottom: '20px'
}

const ItemList = ({items, className, numItemsPerRow, headerText}) => {

    let chunk = function(myItems, size) {
        if (!myItems || 
                !Array.isArray(myItems)) return [];                
        const firstChunk = myItems.slice(0, size);
        if (!firstChunk.length) {
            return myItems; // this is the base case to terminal the recursive
        }
        return [firstChunk].concat(chunk(myItems.slice(size, myItems.length), size));
    }

    let itemsInRow = chunk(items, numItemsPerRow);

    return (
        <div className={`container ${className}`}>
            {headerText ? <h2>{headerText}</h2> : ""}
            {itemsInRow.map(items => (
                <div className="row" style={style}>
                    {items.map((item, index) => (
                        <div className={index == 0 ? 'card col' : 'card col offset-sm-1'}>
                            <img className="card-img-top" src={item.picture} alt="Card image cap"></img>
                            <div className="card-body">                                
                                <Link to={`/item/${item.id}`} className="btn btn-link d-inline">{item.name}</Link>
                            </div>            
                        </div>
                    ))}                                    
                </div>
            ))}
        </div>
    )
}

ItemList.propTypes = {
    items: PropTypes.array.isRequired,
    className: PropTypes.string.isRequired,
    headerText: PropTypes.string,
    numItemsPerRow: PropTypes.number.isRequired
}


export default ItemList;