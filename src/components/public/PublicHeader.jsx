import React from 'react';
import * as Redux from 'react-redux';
import { Link } from 'react-router-dom';
import { userActions } from '../../store/action';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import LanguageToggle from '../common/LanguageToggle';
import './style/PublicHeader.css'
import { Translate } from "react-localize-redux";

class PublicHeader extends React.Component {

    constructor(props) {
        super(props);

        // reset login status
        //this.props.dispatch(userActions.logout());

        this.state = {
            username: '',
            password: '',
            submitted: false,
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

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }    

    render() {
        const { loggingIn, shouldShowAdd } = this.props;
        const { username, password, submitted, title } = this.state;
        return (
            <div className="row offset-10">
                <div className="col-md-3 header">
                    <h3><Link to="/home">{title}</Link></h3>
                </div>

                <div className="col-md-9"> 
                    <div className="row">
                        <div className="col-md-8"></div>
                        <div className="col-md-4 down-35">
                            <div className={shouldShowAdd ? "d-inline-block" : "hiddent"}>
                                <Translate>
                                    {({ translate }) =>
                                        <Link to="/add" className="btn btn-link d-inline">{translate('public.links.addretreate')}</Link>}
                                </Translate>
                            </div>
                            <div className="d-inline-block">
                                <Translate>
                                    {({ translate }) =>
                                        <Link to="/login" className="btn btn-link d-inline">{translate('public.links.login')}</Link>}
                                </Translate>
                            </div>                                
                            <div className="d-inline-block">
                                <Translate>
                                    {({ translate }) =>
                                        <Link to="/register" className="btn btn-link d-inline">{translate('public.links.signup')}</Link>}
                                </Translate>
                            </div>
                        </div> 
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