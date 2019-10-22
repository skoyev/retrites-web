import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { Translate } from "react-localize-redux";
import "./style/CategoryList.css";
import { Button } from 'antd/lib/radio';
import { chunk } from '../../helpers/';

const style = {
    marginBottom: '20px'
}

const CaregoryList = ({items, className, numItemsPerRow, title, description}) => {
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
                        <div key={index} className={index == 0 ? 'card-no col full-width width-295' : 'card-no col offset-ssm-1 full-width width-295'}>                            
                            <div className="img-container">                                
                                <Link to={`${item.typelink}`}>
                                    <img className="card-img-top" style={{maxHeight:'183px', cursor:'pointer'}} src={item.picture} alt="Card image cap"></img>                                
                                </Link>  
                                <div className="centered">
                                    {item.name && item.name.includes(".") ? 
                                        <Translate>
                                            {({ translate }) =>
                                                <Link to={"/" + item.typelink} className="btn btn-link d-inline fancy-text">{translate(item.name)}</Link>}
                                        </Translate> 
                                        :
                                        <Link to="/" className="btn btn-link d-inline fancy-text">{item.name}</Link>
                                    }                                   
                                </div>
                                <div className="card-body-no">
                                    <h5 className="card-title card-font" style={{'display' : item.title ? 'block' : 'none'}}>{item.title ? item.title : ''}</h5>
                                    <h5 className="card-title card-font" style={{'display' : item.title_center ? 'block' : 'none'}}>{item.title_center ? item.title_center : ''}</h5>
                                    <h5 className="card-title card-font-2 margin-top-4" style={{'display' : item.title_bottom ? 'block' : 'none'}}>{item.title_bottom ? item.title_bottom : ''}</h5>
                                    <p className="card-text">{item.description}</p>                                    
                                </div>                                
                            </div>            
                        </div>
                    ))}                                    
                </div>
            ))}
        </div>
    )
}

CaregoryList.propTypes = {
    items: PropTypes.array.isRequired,
    className: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,    
    numItemsPerRow: PropTypes.number.isRequired    
}


export default CaregoryList;