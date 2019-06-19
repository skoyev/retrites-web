import React from 'react';
import { Row, Form, Input, Col } from 'antd';
import PropTypes from 'prop-types'

const SearchHeader = ({title, handleSearch}) => (
 <Row>
    <Col span={5} style={{paddingTop: '15px'}}>
        <h3>{title}</h3>
    </Col>

    <Col span={8}>
        <Input placeholder="Search" onChange={handleSearch}/>
    </Col>

    <Col span={13}>        
    </Col>
 </Row>
);

SearchHeader.propTypes = {
    title: PropTypes.string.isRequired,
    handleSearch: PropTypes.func.isRequired
}

export default SearchHeader;