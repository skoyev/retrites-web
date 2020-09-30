import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './index.css';
import PropTypes from 'prop-types';
import { Icon, Button, Input, DatePicker, Dropdown, Menu } from "antd";
import "antd/dist/antd.css";
import { Translate } from "react-localize-redux";
import { withLocalize } from "react-localize-redux";
import { commonActions, itemActions } from '../../../../store/action';

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
                <Menu.Item key={type.id}>{type.name}</Menu.Item>
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

const SearchBar = props => { 
    let { title, categories, subCategories, durarions, handleSearch, countries } = props;

    useEffect(()=> {
        // fetch categories, then take 1 category - load subcategories
        props
        .fetchCategories()
        //.then(({data:{data:[{id}]}}) => props.fetchSubCategories(id));    

        // fetch countries
        props.fetchCountries();
    }, []);  

    const [selectedDuration, setDuration] = useState('Duration');
    const [selectedCountry, setCountry] = useState({id:0, name:'Country'});
    const [selectedCategory, setCategory] = useState({id:0, name:'Category'});
    const [selectedSubCategory, setSubCategory] = useState({id:0, name:'Sub Category'});
    const [selectedStartDate, setStartDate] = useState();
    
    const handleCountryClick = (v) => {
        setCountry( countries.find(({id}) => id == v.key) );
    };

    const handleCategoryClick = (v) => {
        setCategory(categories.find(({id}) => id == v.key) );
    };

    const handleSubCategoryClick = (v) => {
        setSubCategory(subCategories.find(({id}) => id == v.key) );
    };

    const handleDurationClick = (v) => {
        setDuration(durarions.find((d) => d == v.key) );
    };

    const handleSearchInner = () => {
        handleSearch(selectedCountry, selectedCategory, selectedSubCategory, selectedStartDate, selectedDuration === 'Duration' ? '' : selectedDuration);
    }

    useEffect(() => {
        props.fetchSubCategories(selectedCategory.id)
      }, [selectedCategory]);

    return (
    <div className="slider-section1">
        <section className="search-witget" role="navigation">        
            <div className="tab-content search-witget-content"> 
                <h3>{title}</h3>
                <InputGroup compact>
                    {/* Name item                     
                    <Input onChange={handleInputSearchBy} style={{ width: '20%', height: '35px', borderRadius: '4px' }} placeholder="Find your favorite amenity"/>
                    */}

                    {/* Country Choice */}
                    <Dropdown.Button id="country" overlay={countryMenu(countries, handleCountryClick)} style={{ marginLeft: '5px' }}>
                        <span style={{color: '#b1b0b0'}}>{selectedCountry.name}</span>
                    </Dropdown.Button>

                    {/* Category Choice */}
                    <Dropdown.Button id="category" placeholder="Category" overlay={typeMenu(categories, handleCategoryClick)} style={{ marginLeft: '5px' }}>
                        <span style={{color: '#b1b0b0'}}>{selectedCategory.name}</span>
                    </Dropdown.Button>

                    {/* SubCategory Choice */}
                    <Dropdown.Button id="subcategory" placeholder="Sub Category" disabled={!(subCategories && subCategories.length > 0)} overlay={typeMenu(subCategories, handleSubCategoryClick)} style={{ marginLeft: '5px' }}>
                        <span style={{color: '#b1b0b0'}}>{selectedSubCategory.name}</span>
                    </Dropdown.Button>

                    {/* From Date Choice */}                    
                    <DatePicker onChange={(date, dateString) => setStartDate(dateString)} placeholder="Start Date"  style={{ width: '20%', marginLeft: '5px', height: '35px' }} />

                    {/* Duration Choice */}                                        
                    <Dropdown.Button id="duration" placeholder="Duration" overlay={menu(durarions, handleDurationClick)} style={{ marginLeft: '5px' }}>
                        <span style={{color: '#b1b0b0'}}>{selectedDuration}</span>
                    </Dropdown.Button>

                    {/* Search Button */}                    
                    <Button onClick={handleSearchInner} style={{ marginLeft: '5px', borderRadius: '5px', height: '35px' }} type="primary" icon="search">Search</Button>
                </InputGroup>                                   
            </div>        
        </section>
    </div>      
    )  
};

SearchBar.propTypes = {
    title: PropTypes.string.isRequired,
    handleSearch: PropTypes.func.isRequired
};

const mapDispatchToProps = { 
    ...commonActions,
    ...itemActions
}; 

function mapStateToProps(state) {
    return {
        categories: state.common.categories,
        subCategories: state.common.subCategories,
        countries: state.common.countries,
        durarions: state.items.searchLength,
    };
}

export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(SearchBar));
