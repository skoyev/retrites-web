import React, {useState} from 'react';
import '../style/SearchBar.css'
import { Row, Dropdown, Button, Col, Menu, DatePicker, 
         Input, Modal, InputNumber, Slider } from 'antd';
//import SubMenu from 'antd/lib/menu/SubMenu';
import PropTypes from 'prop-types'
import moment from 'moment';

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
        applyMoreFilters();

        // reset values
        setFromInputValue(100);
        setToInputValue(100);
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

const SearchBar = props => {
    const { handleBack, startDate, 
            countries, types, duration, 
            handleCountryClick, handleTypeClick, handleStartDateClick, handleDurationClick,
            selectedCountryId, selectedTypeId, selectedDuration } = props;

    // More Filters Modal
    const [isMoreFiltersModalVisible, setIsMoreFiltersModalVisible] = useState(false);
    const handleShowHideMoreFiltersModal = (isVisible) => setIsMoreFiltersModalVisible(isVisible);
    const applyMoreFilters = () => setIsMoreFiltersModalVisible(false);

    if(!countries || !types) {
        return <div>No Search Data Provided.</div>;
    }

    const selectedCountry = selectedCountryId ? countries.find(c => c.id == selectedCountryId).type : '';
    const selectedType    = (selectedTypeId && selectedTypeId > 0) ? types.find(t => t.id == selectedTypeId).name : '';
    const selectedDate    = (startDate && startDate.length > 0) ? moment(startDate, 'YYYY-MM-DD') : null;

    return (
        <React.Fragment>
            <Row className="searchBar" gutter={8}>
                <Col span={3}>
                    {/* Country Choice */}
                    <Dropdown.Button id="country" overlay={countryMenu(countries, handleCountryClick)} style={{ marginLeft: '5px' }}>
                        <span style={{color: '#b1b0b0'}}>{selectedCountry}</span>
                    </Dropdown.Button>
                </Col>
                <Col span={4}>
                    {/* Item Type */}
                    <Dropdown.Button id="type" overlay={typeMenu(types, handleTypeClick)} style={{ marginLeft: '5px' }}>
                        <span style={{color: '#b1b0b0'}}>{selectedType}</span>
                    </Dropdown.Button>
                </Col>
                <Col span={3}>
                    {/* Start Date */}                    
                    <DatePicker value={selectedDate} 
                                onChange={handleStartDateClick} 
                                placeholder="Start Date" />
                </Col>
                <Col span={3}>
                    {/* Duration Choice */}
                    <Dropdown.Button id="duration" overlay={durationMenu(duration, handleDurationClick)}>
                        <span style={{color: '#b1b0b0'}}>{selectedDuration}</span>
                    </Dropdown.Button>
                </Col>
                <Col span={3}>
                    <Button onClick={() => handleShowHideMoreFiltersModal(true)}>{`More Filters...`}</Button>
                </Col>
                {/*
                <Col span={2}>
                    <Button htmlType="submit" style={{marginLeft:15}}>Apply</Button>
                </Col>
                */}
                <Col span={2}>
                    <Button onClick={handleBack}>Back</Button>
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

SearchBar.propTypes = {
    handleSubmitSearch: PropTypes.func.isRequired,
    handleBack: PropTypes.func.isRequired
}

export default SearchBar;
