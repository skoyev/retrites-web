import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { Translate } from "react-localize-redux";
import "./index.css";
import { chunk } from '../../../helpers';

const style = {
    marginBottom: '20px'
}

const CategoryList = ({items, className, numItemsPerRow, title, description, type, handleCategoryClick}) => {
    if(!numItemsPerRow || !items){
        console.log(`Error CategoryList - items or numItemsPerRow is null !!!`);
        return <div></div>;
    }

    let itemsInRow = chunk(items, numItemsPerRow);
    return (
        <div className={`container margin-top-bottom-50 item-list ${className}`}>
            {title ? <h2>{title}</h2> : ""}
            {description ? <h4>{description}</h4> : ""}
            {itemsInRow.map((items, index) => (
                <div key={index} className="row" style={style}>
                    {items.map((item, index) => (
                        <div key={index} className={index == 0 ? 'category card-no col full-width width-295' : 'card-no col offset-ssm-1 full-width width-295'}>                            
                            <div className="img-container" onClick={() => handleCategoryClick(item.id)}>                                
                                {/*<Link to={`/items?${type}=${item.type}`}></Link>*/}

                                <img className="card-img-top" style={{maxHeight:'183px', cursor:'pointer'}} src={item.picture} alt="Card image cap"></img>

                                <div className="centered">
                                    {item.name && item.name.includes(".") ? 
                                        <Translate>
                                            {({ translate }) =>                                                
                                                 <span className="btn btn-link d-inline fancy-text">{translate(item.name)}</span>
                                                 }
                                        </Translate> 
                                        :
                                        <span className="btn btn-link d-inline fancy-text">{item.name}</span>
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

CategoryList.propTypes = {
    items: PropTypes.array.isRequired,
    className: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,    
    type: PropTypes.string.isRequired,  
    handleCategoryClick: PropTypes.func.isRequired,  
    numItemsPerRow: PropTypes.number.isRequired    
}


export default CategoryList;