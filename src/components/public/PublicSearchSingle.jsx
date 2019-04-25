import React from 'react';
import './style/PublicSearch.css';
import PropTypes from 'prop-types';
import { Translate } from "react-localize-redux";
import { Icon, Button, Input, DatePicker, Dropdown, Menu } from "antd";
import "antd/dist/antd.css";

const InputGroup = Input.Group;
const { RangePicker } = DatePicker;

const menu = (
    <Menu>
      <Menu.Item key="1"><Icon type="user" />ALL</Menu.Item>
      <Menu.Item key="2"><Icon type="user" />Meditation</Menu.Item>
      <Menu.Item key="3"><Icon type="user" />123</Menu.Item>
    </Menu>
);

const PublicSearchSingle = ({title, search, handleTypeClick, handleMenuClick}) => (  
    <div className="slider-section">
        <section className="search-witget" role="navigation">        
            <div className="tab-content search-witget-content"> 
                <h3>{title}</h3>
                <InputGroup compact>
                    <Input style={{ width: '40%', height: '35px' }} placeholder="Where would you like to go ?"/>
                    <Dropdown.Button onClick={handleTypeClick} overlay={menu} style={{ marginLeft: '5px' }}>
                        <span style={{color: '#b1b0b0'}}>Retreat Type</span>
                    </Dropdown.Button>
                    <RangePicker style={{ width: '30%', marginLeft: '5px', height: '35px' }} />
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
    //handleMenuClick: PropTypes.func.isRequired,
};
   
export default PublicSearchSingle;
