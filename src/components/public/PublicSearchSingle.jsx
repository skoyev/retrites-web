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

const countryMenu = (data, handleClick) => {
    return <Menu onClick={handleClick}>
            {data.map((type, index) => (
                <Menu.Item key={type.id}>{type.type}</Menu.Item>
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
                             handleStartDate, selectedCountry,
                             handleCountryClick, countries}) => (  
    <div className="slider-section1">
        <section className="search-witget" role="navigation">        
            <div className="tab-content search-witget-content"> 
                <h3>{title}</h3>
                <InputGroup compact>
                    {/* Name item */}                    
                    <Input onChange={handleInputSearchBy} style={{ width: '20%', height: '35px', borderRadius: '4px' }} placeholder="Find your favorite amenity"/>

                    {/* Country Choice */}
                    <Dropdown.Button id="country" overlay={countryMenu(countries, handleCountryClick)} style={{ marginLeft: '5px' }}>
                        <span style={{color: '#b1b0b0'}}>{selectedCountry}</span>
                    </Dropdown.Button>

                    {/* Category Choice */}
                    <Dropdown.Button id="category" overlay={typeMenu(types, handleTypeClick)} style={{ marginLeft: '5px' }}>
                        <span style={{color: '#b1b0b0'}}>{subCategory}</span>
                    </Dropdown.Button>

                    {/* From Date Choice */}                    
                    <DatePicker onChange={handleStartDate} placeholder="Start Date"  style={{ width: '20%', marginLeft: '5px', height: '35px' }} />

                    {/* Duration Choice */}                                        
                    <Dropdown.Button id="duration" placeholder="Duration" overlay={menu(length, handleDurationClick)} style={{ marginLeft: '5px' }}>
                        <span style={{color: '#b1b0b0'}}>{selectedDuration}</span>
                    </Dropdown.Button>

                    {/* Search Button */}                    
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
    handleCountryClick: PropTypes.func.isRequired,
    types: PropTypes.array.isRequired,
    length: PropTypes.array.isRequired,
    countries: PropTypes.array.isRequired,
    subCategory: PropTypes.string.isRequired,
    selectedCountry: PropTypes.string.isRequired,
    selectedDuration: PropTypes.string.isRequired
};
   
export default PublicSearchSingle;
