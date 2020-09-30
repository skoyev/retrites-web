import React from 'react';
import PropTypes from 'prop-types'
import { Row, Col } from 'antd';
import { Translate } from "react-localize-redux";
import { Link } from 'react-router-dom';
import './index.css';
import loader from '../../../assets/images/loader.gif';

const Loader = ({text}) => {
    return (
        <React.Fragment>
            <Row className="loader">
                <Col span={10}></Col>
                <Col span={4}>
                    <Row>
                        <div className="text">{text}</div>
                    </Row>
                    <Row>
                        <div style={{width:60, margin: 'auto'}}><img src={loader}/></div>
                    </Row>
                </Col>
                <Col span={10}></Col>
            </Row>
        </React.Fragment>
    )
}

Loader.propTypes = {    
}

export default Loader;