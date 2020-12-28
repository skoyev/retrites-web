import React from 'react';
import * as Redux from 'react-redux';
import { Link } from 'react-router-dom';
import { userActions } from '../../store/action';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import LanguageToggle from '../common/LanguageToggle';
import './style/PublicHeader.css'
import { Translate } from "react-localize-redux";
import { Button, Input, Tooltip, Row, Col } from 'antd';
import {withRouter} from 'react-router-dom';
import { commonConstants } from '../../constants';
import { SearchOutlined } from '@ant-design/icons';
import { withLocalize } from "react-localize-redux";
import globalTranslations from "../../translations/global.json";
import { renderToStaticMarkup } from "react-dom/server";

class PublicHeader extends React.Component {

    constructor(props) {
        super(props);

        // reset login status
        //this.props.dispatch(userActions.logout());

        this.state = {
            username: '',
            password: '',
            submitted: false,
            name: '',
            isLoggedInRes: this.props.isLoggedInRes,
            title: 'Retreat Your Mind'
        };

        this.props.initialize({
            languages: [
                {name : "English", code: "en"},
                {name : "French", code: "fr"}
            ],
            translation: globalTranslations,
            options: { renderToStaticMarkup },
        });        

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onKeyUp      = this.onKeyUp.bind(this);
    }   
    
    onKeyUp(event) {
        if (event.charCode === 13) {
            this.props.handleSearchClick(this.state.name)
        }
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
                            <Link to={commonConstants.ADD_PAGE_LINK} className="btn btn-link d-inline header-link">{translate('public.links.addretreate')}</Link>}
                    </Translate>
                </div>
                <div className="d-inline-block white">
                    <Translate>
                        {({ translate }) =>
                            <Link to={commonConstants.LOGIN_PAGE_LINK} className="btn btn-link d-inline header-link">{translate('public.links.login')}</Link>}
                    </Translate>
                </div>                                
                <div className="d-inline-block white">
                    <Translate>
                        {({ translate }) =>
                            <Link to={commonConstants.REGISTER_PAGE_LINK} className="btn btn-link d-inline header-link">{translate('public.links.signup')}</Link>}
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
                        <Link to={commonConstants.DASHBOARD_PAGE_LINK} className="btn btn-link d-inline">{translate('public.links.dashboard')}</Link>}
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

    publicAddHeader = () => 
        <Row>
            <Col span={10} offset={8}>
                <div className="d-inline-block white">
                    <Translate>
                        {({ translate }) =>
                            <Link to={commonConstants.LOGIN_PAGE_LINK} className="btn btn-link d-inline">{translate('public.links.login')}</Link>}
                    </Translate>
                </div>                                
                <div className="d-inline-block white">
                    <Translate>
                        {({ translate }) =>
                            <Link to={commonConstants.REGISTER_PAGE_LINK} className="btn btn-link d-inline">{translate('public.links.signup')}</Link>}
                    </Translate>
                </div>
            </Col>
        </Row>
    

    getContentLeft = (isLoggedInRes) => {
        const loc = this.props.location.pathname;
        let {showTopSearch} = this.props;
        let {name} = this.state;
        console.log(name)        

        if(!isLoggedInRes && 
            !(loc && loc.includes("add")) &&
                showTopSearch){
            return <Row>
                        <Col span={16} offset={2}>
                            <Input value={name} onKeyPress={this.onKeyUp} onChange={({target:{value:data}}) => this.setState({name:data})}/>                            
                        </Col>
                        <Col span={2} offset={1}>
                            <Button shape="circle" icon='search' onClick={() => this.props.handleSearchClick(name)} />
                        </Col>
                   </Row>
        } else {
            return '';
        }
    }

    getContent = (isLoggedInRes) => {
        const loc = this.props.location.pathname;
        let content = this.publicHeader();
        if(isLoggedInRes){
            content = this.loggedHeader()
        } else if (loc && loc.includes("add")) {
            content = this.publicAddHeader();
        } 

        return content;
    }

    render() {        
        const { username, password, submitted, title, isLoggedInRes } = this.state;
        const content = this.getContent(isLoggedInRes);
        const contentLeft = this.getContentLeft(isLoggedInRes);
        return (
            <div id="main-header" className="row">
                <div className="col-md-3 header">
                    <h3 className="white"><Link to={commonConstants.HOME_PAGE_LINK}><img id="logo" src={'/images/rymlogo-main.png'}/></Link></h3>
                </div>

                <div className="col-md-9 down-35"> 
                        {/*
                        <div className={isLoggedInRes ? "col-md-8" : "col-md-6"}></div>
                        <div className={isLoggedInRes ? "col-md-4 down-35 header-right" : "col-md-6 down-35 header-right"}>{content}</div> 
                        */}
                    <div className='row'>
                        <div className="col-md-7"> 
                            {contentLeft}                           
                        </div>
                        <div className="col-md-5">  
                            {content}                          
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
  
export default withLocalize(connect(null, mapDispatchToProps)(withRouter(PublicHeader)));