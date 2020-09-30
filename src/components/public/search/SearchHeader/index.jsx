import React from 'react';
import { Row, Form, Input, Col, Button } from 'antd';
import PropTypes from 'prop-types'
import { Translate } from "react-localize-redux";
import { Link } from 'react-router-dom';
import './index.css';

const loggedInHeader = (handleLogoutClick) => (
    <React.Fragment>
        <div className={"d-inline-block"}>
            <Translate>
                {({ translate }) =>
                    <Link to="/dashboard" className="btn btn-link d-inline">{translate('public.links.dashboard')}</Link>}
            </Translate>
        </div>
        <div className="d-inline-block">
            <Translate>
                {({ translate }) =>
                    <Link to="/home" onClick={handleLogoutClick} className="btn btn-link d-inline">{translate('public.links.signout')}</Link>
                }
            </Translate>
        </div>
    </React.Fragment>
)

const publicHeader = () => (
    <React.Fragment>
        <div className={"d-inline-block white"}>
            <Translate>
                {({ translate }) =>
                    <Link to="/add" className="btn btn-link d-inline">{translate('public.links.addretreate')}</Link>}
            </Translate>
        </div>
        <div className="d-inline-block white">
            <Translate>
                {({ translate }) =>
                    <Link to="/login" className="btn btn-link d-inline">{translate('public.links.login')}</Link>}
            </Translate>
        </div>                                
        <div className="d-inline-block white">
            <Translate>
                {({ translate }) =>
                    <Link to="/register" className="btn btn-link d-inline">{translate('public.links.signup')}</Link>}
            </Translate>
        </div>
    </React.Fragment>
)

const SearchHeader = ({title, handleNameChange, isLoggedIn, handleLogoutClick, selectedName, shouldShowSearchInput}) => (
 <Row>
    <Col span={5} style={{paddingTop: '15px'}}>
        <h3>{title}</h3>
    </Col>

    <Col span={6}>
        {/* shouldShowSearchInput ?
            <Input placeholder="Search" value={selectedName} onChange={handleNameChange}/>
            : ''
        */}
    </Col>

    <Col span={13}>
        <div style={{float: 'right'}}>
            {isLoggedIn ? loggedInHeader(handleLogoutClick) : publicHeader()}        
        </div>
    </Col>
 </Row>
);

SearchHeader.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    handleLogoutClick: PropTypes.func.isRequired,
    shouldShowSearchInput: PropTypes.bool.isRequired
}

export default SearchHeader;
