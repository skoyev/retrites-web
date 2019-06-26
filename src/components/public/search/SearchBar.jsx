import React from 'react';
import { useState } from 'react';
import '../style/SearchBar.css'
import { Row, Button, Col, Menu, Icon, Card, DatePicker, Input } from 'antd';
//import SubMenu from 'antd/lib/menu/SubMenu';
import PropTypes from 'prop-types'

const { SubMenu }  = Menu;

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

const SearchBar = ({handleSubmitSearch, handlePriceFromChange, handlePriceToChange, onDateRangeChange}) => {

    return (
        <Row style={{padding:'12px', borderTop:'1px solid #c3c2c2', borderBottom:'1px solid #c3c2c2', backgroundColor:'#ffffff'}}>
            <form name="search-form" onSubmit={handleSubmitSearch}>
                <Row gutter={8}>
                    <Col span={5}>
                        <RangePicker onChange={onDateRangeChange}
                                     placeholder={['Start Course', 'End Course']}/>
                    </Col>
                    <Col span={3}>
                        <Input placeholder="Price From" defaultValue="" type="number" onChange={handlePriceFromChange}/>
                    </Col>
                    <Col span={3}>
                        <Input placeholder="Price To" defaultValue="" type="number" onChange={handlePriceToChange}/>
                    </Col>
                    <Col span={3}>
                        <Button htmlType="submit">Apply</Button>
                    </Col>
                </Row>
            </form>
        </Row>
    )
}

SearchBar.propTypes = {
    handleSubmitSearch: PropTypes.func.isRequired,
    handlePriceFromChange: PropTypes.func.isRequired,
    handlePriceToChange: PropTypes.func.isRequired,
    onDateRangeChange: PropTypes.func.isRequired
}

export default SearchBar;
