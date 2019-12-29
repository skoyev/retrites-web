import React from 'react';
import { Row, Form, Input, Col, Button } from 'antd';
import PropTypes from 'prop-types'
import { Translate } from "react-localize-redux";
import { Link } from 'react-router-dom';

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
                    <Button onClick={handleLogoutClick} type="link">{translate('public.links.signout')}</Button>}
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

const SearchHeader = ({title, handleSearch, isLoggedIn, handleLogoutClick}) => (
 <Row>
    <Col span={5} style={{paddingTop: '15px'}}>
        <h3>{title}</h3>
    </Col>

    <Col span={6}>
        <Input placeholder="Search" onChange={handleSearch}/>
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
    handleSearch: PropTypes.func.isRequired,
    handleLogoutClick: PropTypes.func.isRequired
}

export default SearchHeader;