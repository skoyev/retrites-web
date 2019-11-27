import React from 'react';
import './style/PublicSearch.css';
import PropTypes from 'prop-types';
import { Icon, Button, Input, DatePicker, Dropdown, Menu } from "antd";
import "antd/dist/antd.css";
import { Translate } from "react-localize-redux";

const InputGroup = Input.Group;
const { RangePicker } = DatePicker;

const menu = (types, handleDurationClick) => {
    return <Menu onClick={handleDurationClick}>
            {types.map((type, index) => (
                <Menu.Item key={type}>{type}</Menu.Item>
            ))}
          </Menu>
};

const typeMenu = (types, handleTypeClick) => {
    return <Menu onClick={handleTypeClick}>
            {types.map((type, index) => (
                <Menu.Item key={type.id}>
                    {type.name}
                    {/*
                    <Translate>
                        {
                            ({ translate }) =>
                            {translate(type.name)}
                        }                            
                    </Translate>
                    */}                    
                </Menu.Item>
            ))}
          </Menu>
};

const PublicSearchSingle = ({title, search, handleTypeClick, handleDurationClick, types, length, 
                             subCategory, selectedDuration, handleInputSearchBy,
                             handleStartDate}) => (  
    <div className="slider-section">
        <section className="search-witget" role="navigation">        
            <div className="tab-content search-witget-content"> 
                <h3>{title}</h3>
                <InputGroup compact>
                    <Input onChange={handleInputSearchBy} style={{ width: '30%', height: '35px' }} placeholder="Where would you like to go ?"/>
                    <Dropdown.Button overlay={typeMenu(types, handleTypeClick)} style={{ marginLeft: '5px' }}>
                        <span style={{color: '#b1b0b0'}}>{subCategory}</span>
                    </Dropdown.Button>
                    <DatePicker onChange={handleStartDate} placeholder="Start Date"  style={{ width: '20%', marginLeft: '5px', height: '35px' }} />
                    <Dropdown.Button placeholder="Duration" overlay={menu(length, handleDurationClick)} style={{ marginLeft: '5px' }}>
                        <span style={{color: '#b1b0b0'}}>{selectedDuration}</span>
                    </Dropdown.Button>
                    <Button onClick={search} style={{ marginLeft: '5px', borderRadius: '5px', height: '35px' }} type="primary" icon="search">Search</Button>
                </InputGroup>                                   
            </div>        
        </section>
    </div>        
);

PublicSearchSingle.propTypes = {
    title: PropTypes.string.isRequired,
    search: PropTypes.func.isRequired,
    handleTypeClick: PropTypes.func.isRequired,
    handleDurationClick: PropTypes.func.isRequired,
    handleInputSearchBy: PropTypes.func.isRequired,
    handleStartDate: PropTypes.func.isRequired,
    types: PropTypes.array.isRequired,
    length: PropTypes.array.isRequired,
    subCategory: PropTypes.object.isRequired,
    selectedDuration: PropTypes.object.isRequired
};
   
export default PublicSearchSingle;
