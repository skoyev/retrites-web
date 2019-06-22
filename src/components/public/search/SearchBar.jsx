import React from 'react';
import '../style/SearchBar.css'
import { Row, Button, Col, Menu, Icon, Card, DatePicker, Input } from 'antd';
//import SubMenu from 'antd/lib/menu/SubMenu';

const { SubMenu }  = Menu;

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

const SearchBar = () => {
    const size = '';

    return (
        <Row style={{padding:'12px', borderTop:'1px solid #c3c2c2', borderBottom:'1px solid #c3c2c2', backgroundColor:'#ffffff'}}>
            <Row gutter={8}>
                <Col span={5}>
                    <RangePicker />
                </Col>
                <Col span={3}>
                    <Input placeholder="Price From" defaultValue="" />
                </Col>
                <Col span={3}>
                    <Input placeholder="Price To" defaultValue="" />
                </Col>
                <Col span={3}>
                    <Button>Apply</Button>
                </Col>
            </Row>
        </Row>
    )
}

export default SearchBar;