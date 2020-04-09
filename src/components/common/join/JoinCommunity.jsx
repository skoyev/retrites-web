import React from 'react';
import PropTypes from 'prop-types'
import { Row, Col } from 'antd';
import { Translate } from "react-localize-redux";
import { Link } from 'react-router-dom';
import './index.css';

const JoinUs = ({text}) => {
    return (
        <Row>
            <Col span={7}></Col>
            <Col span={5} className="center">
                <Translate>
                    {({ translate }) =>
                        <Link to="/register" className="btn btn-link d-inline">{translate('public.links.join')}</Link>}                        
                </Translate>
            </Col>
            <Col span={1} className="center">OR</Col>
            <Col span={5} className="center">
                <Translate>
                    {({ translate }) =>
                            <Link to="/login" className="btn btn-link d-inline">{translate('public.links.login_community')}</Link>}
                </Translate>
            </Col>
            <Col span={6}></Col>
        </Row>
    )
}

JoinUs.propTypes = {    
}

export default JoinUs;