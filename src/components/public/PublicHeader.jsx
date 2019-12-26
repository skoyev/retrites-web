import React from 'react';
import * as Redux from 'react-redux';
import { Link } from 'react-router-dom';
import { userActions } from '../../store/action';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import LanguageToggle from '../common/LanguageToggle';
import './style/PublicHeader.css'
import { Translate } from "react-localize-redux";
import { Button } from 'antd';

class PublicHeader extends React.Component {

    constructor(props) {
        super(props);

        // reset login status
        //this.props.dispatch(userActions.logout());

        this.state = {
            username: '',
            password: '',
            submitted: false,
            isLoggedInRes: this.props.isLoggedInRes,
            title: 'Retreat Your Mind'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }    

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { login } = this.props;
        if (username && password) {
            //dispatch(userActions.login(username, password));
            login(username, password);
        }
    }

    componentDidUpdate(prevProps){
        //console.log('componentDidUpdate')
        if (this.props.isLoggedInRes !== prevProps.isLoggedInRes) {
            this.setState({isLoggedInRes: this.props.isLoggedInRes})
        }
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }    

    publicHeader = () => {
        return (
        <React.Fragment>
        <div className={"d-inline-block white"}>
            <Translate>
                {({ translate }) =>
                        <Button onClick={() => this.props.handleSubscribeClick()} type="link">{translate('public.links.subscribe')}</Button>}
            </Translate>
        </div>
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
    )}

    loggedHeader = () => {
        return (
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
                        <Button onClick={() => this.props.handleLogoutClick()} type="link">{translate('public.links.signout')}</Button>}
                </Translate>
            </div>
        </React.Fragment>
    )}

    render() {        
        const { username, password, submitted, title, isLoggedInRes } = this.state;
        const content = isLoggedInRes ? this.loggedHeader() : this.publicHeader();
        return (
            <div id="main-header" className="row offset-10">
                <div className="col-md-3 header">
                    <h3 className="white"><Link to="/home">{title}</Link></h3>
                </div>

                <div className="col-md-9"> 
                    <div className="row">
                        <div className={isLoggedInRes ? "col-md-8" : "col-md-6"}></div>
                        <div className={isLoggedInRes ? "col-md-4 down-35 header-right" : "col-md-6 down-35 header-right"}>{content}</div> 
                    </div>                                                       
                </div>

                {/*
                <div className="col-md-3">
                    <LanguageToggle></LanguageToggle>
                </div>
                */}
            </div>
        );
    }
} 

const mapDispatchToProps = {    
    ...userActions
};  
  
export default connect(null, mapDispatchToProps)(PublicHeader);