import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { Translate } from "react-localize-redux";
import "./style/ItemList.css";
import { Button } from 'antd/lib/radio';
import { chunk } from '../../helpers/';
import moment from 'moment';

const style = {
    marginBottom: '20px'
}

{/*<Link to={"/" + item.typelink} className="btn btn-link d-inline fancy-text">{translate(item.name)}</Link>}*/}

const ItemList = ({items, className, numItemsPerRow, title, description, handleMoreItems, 
                   shouldHideLoadMore, handleItemClick}) => {
    if(!items){
        return;
    }
    
    let itemsInRow = chunk(items, numItemsPerRow);
    return (
        <div className={`container margin-top-bottom-50 item-list ${className}`}>
            {title ? <h2>{title}</h2> : ""}
            {description ? <h4>{description}</h4> : ""}
            {itemsInRow.map((items, index) => (
                <div key={index} className="row" style={style}>
                    {items.map((item, index) => (
                        <div key={index} className={index == 0 ? 'card-no col full-width width-295' : 'card-no col offset-ssm-1 full-width width-295'}>                            
                            <div className="img-container" onClick={() => handleItemClick(item.id)}>                                
                                {/*<Link to={'/item/' + item.id + '?category=' + category}>*/}
                                {/*
                                <Link to={'/item/' + item.id}>
                                    <img className="card-img-top" style={{maxHeight:'183px', cursor:'pointer'}} src={item.picture} alt="Card image cap"></img>                                
                                </Link>                                
                                */}
                                <img className="card-img-top" style={{maxHeight:'183px', cursor:'pointer'}} src={item.picture} alt="Card image cap"></img>                                
                                {/*
                                <div className="centered">
                                    {item.name && item.name.includes(".") ? 
                                        <Translate>
                                            {({ translate }) =>                                                
                                                <Button className="link-text" type="link">{translate(item.name)}</Button>}                                                
                                        </Translate> 
                                        :
                                        <Link to="/" className="btn btn-link d-inline fancy-text">{item.name}</Link>
                                    } 
                                </div>
                                */}
                                <div className="card-body-no">
                                    <h5 className="card-title card-font">{`Name: ${item.name}`}</h5>
                                    <div className="card-title card-font-3 margin-top-4 card-text" style={{'display' : item.events ? 'block' : 'none'}}>{item.events ? 'Price: $' + item.events[0].price + '/per course': ''}</div>
                                    <div className="card-title card-font-3 margin-top-4 card-text" style={{'display' : item.events ? 'block' : 'none'}}>{item.events ? 'Date: ' + moment( item.events[0].from ).format('L') + ' - ' + item.events[0].duration + ' days': ''}</div>
                                    <p className="card-text">{`Country: ${item.country.name}`}</p>                                    
                                    <p className="card-text">{`Description: ${item.description}`}</p>                                    
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
    handleItemClick: PropTypes.func.isRequired,
    //category: PropTypes.string.isRequired,
    shouldHideLoadMore: PropTypes.bool.isRequired
}


export default ItemList;