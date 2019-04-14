import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { Translate } from "react-localize-redux";

const style = {
    marginBottom: '20px'
}

const ItemList = ({items, className, numItemsPerRow, title, description}) => {

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
        <div className={`container margin-top-bottom-50 item-list ${className}`}>
            {title ? <h2>{title}</h2> : ""}
            {description ? <h4>{description}</h4> : ""}
            {itemsInRow.map(items => (
                <div className="row" style={style}>
                    {items.map((item, index) => (
                        <div className={index == 0 ? 'card col' : 'card col offset-ssm-1'}>                            
                            <div className="img-container">                                
                                <img className="card-img-top" src={item.picture} alt="Card image cap"></img>                                
                                <div class="centered">
                                    {item.name.includes(".") ? 
                                        <Translate>
                                            {({ translate }) =>
                                                <Link to="/new-retreate" className="btn btn-link d-inline fancy-text">{translate(item.name)}</Link>}
                                        </Translate> 
                                        :
                                        <Link to="/new-retreate" className="btn btn-link d-inline fancy-text">{item.name}</Link>
                                    }                                   
                                </div>
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
    className: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    numItemsPerRow: PropTypes.number.isRequired
}


export default ItemList;