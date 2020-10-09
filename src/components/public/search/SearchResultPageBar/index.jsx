import React, { useEffect, useState } from 'react';
import './index.css';
import { Row, Dropdown, Button, Col, Menu, DatePicker, 
         Input, Modal, InputNumber, Slider } from 'antd';
//import SubMenu from 'antd/lib/menu/SubMenu';
import PropTypes from 'prop-types'
import { withLocalize } from "react-localize-redux";
import moment from 'moment';
import { itemActions, commonActions } from '../../../../store/action';
import { connect } from 'react-redux';

const { SubMenu }  = Menu;

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

const PricePicker = props => {
    const {min, max, onFromPriceChange, onToPriceChange, fromInputValue, toInputValue} = props
    return  <React.Fragment>
                <Row style={{marginBottom: 20}}>
                    <span>Select Price Range</span>
                </Row>
                <Row>
                    <Col span={3} style={{marginTop:5}}>
                        <span><b>From:</b></span>
                    </Col>                    

                    <Col span={12}>                        
                        <Slider
                            min={min}
                            max={max}
                            onChange={onFromPriceChange}
                            value={typeof fromInputValue === 'number' ? fromInputValue : 0}/>
                    </Col>

                    <Col span={5}>
                        <InputNumber
                            min={min}
                            max={max}                            
                            value={fromInputValue}
                            onChange={onFromPriceChange}/>                        
                    </Col>

                    <Col span={3} style={{marginTop:5}}>
                        <span><b>$</b></span>
                    </Col>                    
                </Row>
                <Row>
                    <Col span={3} style={{marginTop:5}}>
                        <span><b>To:</b></span>
                    </Col>                    

                    <Col span={12}>                        
                        <Slider
                            min={min}
                            max={max}
                            onChange={onToPriceChange}
                            value={typeof toInputValue === 'number' ? toInputValue : 0}/>
                    </Col>

                    <Col span={5}>
                        <InputNumber
                            min={min}
                            max={max}                            
                            value={toInputValue}
                            onChange={onToPriceChange}/>                        
                    </Col>

                    <Col span={3} style={{marginTop:5}}>
                        <span><b>$</b></span>
                    </Col>                    
                </Row>
            </React.Fragment>
}

const MoreFiltersModal = ({isMoreFiltersModalVisible, cancelMoreFiltersModal, applyMoreFilters}) => {
    const min = 100;
    const max = 5000;

    const [error, setError] = useState('');

    const [fromInputValue, setFromInputValue] = useState(min);
    const onFromPriceChange = (value) => setFromInputValue(value);

    const [toInputValue, setToInputValue] = useState(min);
    const onToPriceChange = (value) => setToInputValue(value);

    const validateApplyMoreFilters = () => {
        if(fromInputValue >= toInputValue){
            setError("Warning. From price cannont be greater then To price !")
            return;
        } 
        setError('');
        applyMoreFilters(fromInputValue, toInputValue);

        // reset values
        setFromInputValue(fromInputValue);
        setToInputValue(toInputValue);
    }

    return ( 
        <Modal  visible={isMoreFiltersModalVisible}
                title={"More Filters"}
                footer={[
                    <Button key="back" onClick={() => cancelMoreFiltersModal(false)}>Cancel</Button>,
                    <Button key="submit" type="primary" onClick={validateApplyMoreFilters}>Apply</Button>
                ]}>
                <Row>
                    <PricePicker min={min} 
                                 max={max} 
                                 fromInputValue={fromInputValue} 
                                 toInputValue={toInputValue} 
                                 onFromPriceChange={onFromPriceChange}
                                 onToPriceChange={onToPriceChange}/>
                </Row>
                <Row style={{marginTop: 20}}>
                    <span style={{color:'#FFC300'}}>{error}</span>
                </Row>
        </Modal>
    )
}

const countryMenu = (data, handleClick) => {
    return <Menu onClick={handleClick}>
            {data ? data.map((type, index) => (
                <Menu.Item key={type.id}>{type.name}</Menu.Item>
            )) : ''}
          </Menu>
};

const typeMenu = (data, handleClick) => {
    return <Menu onClick={handleClick}>
            {data ? data.map((type, index) => (
                <Menu.Item key={type.id}>{type.type}</Menu.Item>
            )) : ''}
          </Menu>
};

const durationMenu = (data, handleClick) => {
    return <Menu onClick={handleClick}>
            {data ? data.map((d, index) => (
                <Menu.Item key={d}>{d}</Menu.Item>
            )) : ''}
          </Menu>
};

const SearchResultPageBar = props => {
    const { handleBack, handleSubmitSearch, countries, durarions, moreFilterClick } = props;

    let urlParams = new URLSearchParams(window.location.search)
    const initDuration  = urlParams.get('duration');
    const initStartDate = urlParams.get('startDate');

    const [searchText, setSearchText] = useState();            
    const [durarion, setDurarion] = useState();            
    const [startDate, setStartDate] = useState(); 
    
    // More Filters Modal
    const [isMoreFiltersModalVisible, setIsMoreFiltersModalVisible] = useState(false);
    const handleShowHideMoreFiltersModal = (isVisible) => setIsMoreFiltersModalVisible(isVisible);
    const applyMoreFilters = (fromPrice, toPrice) => {
        setIsMoreFiltersModalVisible(false);
        moreFilterClick(fromPrice, toPrice);
    }

    const initData = () => {
        let urlParams = new URLSearchParams(window.location.search)
        const initDuration  = urlParams.get('duration');
        const initStartDate = urlParams.get('startDate');    
        
        setDurarion(initDuration ? initDuration : 'Any');
        setStartDate(initStartDate ? initStartDate : moment().format());
    }

    useEffect(()=> {
        // fetch categories
        props
        .fetchCategories()
        .then(({data:{data:[{id}]}}) => props.fetchSubCategories(id));    

        // fetch countries
        props.fetchCountries();

        // init data
        initData();
    }, []);  

    if(!countries || countries.length == 0 ) {
        return <div>No Search Data Provided.</div>;
    }

    const selectedDate  = (startDate && startDate.length > 0) ? moment(startDate, 'YYYY-MM-DD') : null;    
    const handleSubmitSearchInner = () => {
        handleSubmitSearch(searchText, durarion, startDate);
    }

    return (
        <React.Fragment>
            <Row className="searchBar" gutter={8}>
                <Col span={4}>
                    <Row gutter={8} style={{marginTop: -25}}>
                        <div style={{height:25}}><label htmlFor="name">Name</label></div>
                        <div style={{marginRight:10}}><Input className="color" value={searchText} onChange={({target:{value:data}})=>setSearchText(data)} placeholder="Retreat Name"/></div>
                    </Row>
                </Col>
                <Col span={3}>
                    <Row gutter={8} style={{marginTop: -25}}>
                        <div style={{height:25}}><label htmlFor="name">Start Date</label></div>
                        <div style={{marginRight:10}}>
                            {/* Start Date */}                    
                            <DatePicker value={selectedDate} 
                                        onChange={(date, dateString) => setStartDate(dateString)}
                                        placeholder="Start Date" />
                        </div>
                    </Row>
                </Col>
                <Col span={3}>
                    <Row gutter={8} style={{marginTop: -25}}>
                        <div style={{height:25}}><label htmlFor="name">Duration</label></div>
                        <div>
                            {/* Duration Choice */}
                            <Dropdown.Button id="duration" overlay={durationMenu(durarions, (e) => {setDurarion(durarions.find((d) => d == e.key) )})}>
                                <span style={{color: '#b1b0b0'}}>{durarion}</span>
                            </Dropdown.Button>
                        </div>
                    </Row>
                </Col>
                <Col span={3}>
                    <Button onClick={() => handleShowHideMoreFiltersModal(true)}>{`More Filters...`}</Button>
                </Col>
                <Col span={2}>
                    <Button type="primary" onClick={handleSubmitSearchInner}>Search</Button>
                </Col>
                <Col span={2}>
                    <Button type="primary" onClick={handleBack}>Back</Button>
                </Col>

                {/*
                <form name="search-form" onSubmit={handleSubmitSearch}>
                    <Row gutter={8}>
                        <Col span={5}>
                            <Button onClick={handleShowDatePicker}>{`Start: ${startDate}`}</Button>
                            <RangePicker onChange={onDateRangeChange}
                                        placeholder={['Start Course', 'End Course']}/>
                        </Col>
                        <Col span={3}>
                            <Input placeholder="Price From" defaultValue="" type="number" onChange={handlePriceFromChange}/>
                        </Col>
                        <Col span={3}>
                            <Input placeholder="Price To" defaultValue="" type="number" onChange={handlePriceToChange}/>
                        </Col>
                    </Row>
                </form>
                */}
            </Row>            
            <MoreFiltersModal isMoreFiltersModalVisible = {isMoreFiltersModalVisible}
                              cancelMoreFiltersModal    = {handleShowHideMoreFiltersModal}
                              applyMoreFilters          = {applyMoreFilters}/>
        </React.Fragment>
    )
}

SearchResultPageBar.propTypes = {
    handleSubmitSearch: PropTypes.func.isRequired,
    handleBack: PropTypes.func.isRequired
}

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

export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(SearchResultPageBar));