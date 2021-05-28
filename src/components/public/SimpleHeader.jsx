import React from 'react';
import * as Redux from 'react-redux';
import { Link } from 'react-router-dom';
import { userActions } from '../../store/action';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import LanguageToggle from '../common/LanguageToggle';
import './style/SimpleHeader.css'
import { Translate } from "react-localize-redux";
import { Button } from 'antd';
import { commonConstants } from '../../constants';

class SimpleHeader extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: 'Retreat Your Mind'
        };
    }


    publicHeader = () => {
        return (
            <React.Fragment>
                {/*
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
            </div> */}
            </React.Fragment>
        )
    }

    render() {
        const { title, isLoggedInRes } = this.state;
        const content = isLoggedInRes ? this.loggedHeader() : this.publicHeader();
        return (
            <div className="row offset-10 top-header">
                <div className="col-md-3 header">
                    {/*<h3 className="white"><Link to="/">{title}</Link></h3>*/}
                    <Link to={commonConstants.HOME_PAGE_LINK}><img src={'/images/rymlogo-main.png'} /></Link>
                </div>

                <div className="col-md-9">
                    <div className="row">
                        <div className={isLoggedInRes ? "col-md-8" : "col-md-7"}></div>
                        <div className={isLoggedInRes ? "col-md-4 down-35 header-right" : "col-md-5 down-35 header-right"}>{content}</div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = {
    ...userActions
};

export default connect(null, mapDispatchToProps)(SimpleHeader);