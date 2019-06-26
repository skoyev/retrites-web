import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { Translate } from "react-localize-redux";
import "./style/ItemList.css";
import { Button } from 'antd/lib/radio';

const style = {
    marginBottom: '20px'
}

const ItemList = ({items, className, numItemsPerRow, title, description, handleMoreItems, category, shouldHideLoadMore}) => {

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
                        <div className={index == 0 ? 'card-no col full-width width-295' : 'card-no col offset-ssm-1 full-width width-295'}>                            
                            <div className="img-container">                                
                                <Link to={'/' + category + '/' +item.id}>
                                    <img className="card-img-top" style={{maxHeight:'220px', cursor:'pointer'}} src={item.picture} alt="Card image cap"></img>                                
                                </Link>                                
                                <div class="centered">
                                    {item.name && item.name.includes(".") ? 
                                        <Translate>
                                            {({ translate }) =>
                                                <Link to={"/" + item.typelink} className="btn btn-link d-inline fancy-text">{translate(item.name)}</Link>}
                                        </Translate> 
                                        :
                                        <Link to="/" className="btn btn-link d-inline fancy-text">{item.name}</Link>
                                    }                                   
                                </div>
                                <div class="card-body-no">
                                    <h5 class="card-title card-font" style={{'display' : item.title ? 'block' : 'none'}}>{item.title ? item.title : ''}</h5>
                                    <h5 class="card-title card-font" style={{'display' : item.title_center ? 'block' : 'none'}}>{item.title_center ? item.title_center : ''}</h5>
                                    <h5 class="card-title card-font-2 margin-top-4" style={{'display' : item.title_bottom ? 'block' : 'none'}}>{item.title_bottom ? item.title_bottom : ''}</h5>
                                    <div class="card-title card-font-3 margin-top-4" style={{'display' : item.price ? 'block' : 'none'}}>{item.price ? '$' + item.price + '/per course': ''}</div>
                                    <div class="card-title card-font-3 margin-top-4" style={{'display' : item.start_date ? 'block' : 'none'}}>{item.start_date ? item.start_date + '/' + item.duration + ' days': ''}</div>
                                    <p class="card-text">{item.description}</p>                                    
                                </div>                                
                            </div>            
                        </div>
                    ))}                                    
                </div>
            ))}
            <div className={shouldHideLoadMore ? 'hidden' : ''}>
                <div style={{'width':'100px', 'margin' : 'auto'}}><Button onClick={handleMoreItems}>Load More</Button></div>
            </div>
        </div>
    )
}

ItemList.propTypes = {
    items: PropTypes.array.isRequired,
    className: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    numItemsPerRow: PropTypes.number.isRequired,
    handleMoreItems: PropTypes.func,
    category: PropTypes.string.isRequired,
    shouldHideLoadMore: PropTypes.bool.isRequired
}


export default ItemList;