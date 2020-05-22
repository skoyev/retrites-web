import React from 'react';
import { Translate } from "react-localize-redux";
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withLocalize } from "react-localize-redux";
import {userActions, commonActions} from '../../store/action'
import { history } from '../../helpers';
import '../style/Base.css'
import './index.css'
import { renderToStaticMarkup } from "react-dom/server";
import globalTranslations from "../../translations/global.json";
import { Button, Row, Col } from 'antd';
import { SimpleHeader } from '../../components/public';
import loader from '../../assets/images/loader.gif';

class LoginPage extends React.Component {
    
    constructor(props, context) {
        super(props, context);        
        this.props.initialize({
            languages: [
                {name : "English", code: "en"},
                {name : "French", code: "fr"}
            ],
            translation: globalTranslations,
            options: { renderToStaticMarkup },
        });        

        this.state = {
            email: '',
            password: '',
            submitted: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);        
    }  

    componentDidMount() {
        this.props.resetLogin();
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.isLoggedInRes) {            
            history.push('/dashboard');
        }
    }    
    
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { email, password } = this.state;
        const { login } = this.props;
        const activateValues = this.props.location.search.split('activateCode=');

        if (email && password) {
            login(email, password, activateValues.length == 2 ? activateValues[1] : "");
        }
    }

    render() {
        const { error, isLoading } = this.props;
        const { email, password, submitted } = this.state;

        return (
            <React.Fragment>
                <SimpleHeader/>
                <div className="container center" style={{marginTop: 25}}>
                    <div className="row vertical justify-content-center align-items-center new-retreate">
                        <div className="col-4">
                            <div className="card">
                                <div className="card-body">
                                    <Translate>{({ translate }) =><h2>{translate("header.login")}</h2>}</Translate>
                                    <form name="form" onSubmit={this.handleSubmit}>
                                        <div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
                                            <label htmlFor="email">Email</label>
                                            <input type="email" className="form-control" name="email" value={email} onChange={this.handleChange} />
                                            {submitted && !email &&
                                                <div className="help-block">Email is required</div>
                                            }
                                        </div>

                                        <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                                            <label htmlFor="password">Password</label>
                                            <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                                            {submitted && !password &&
                                                <div className="help-block">Password is required</div>
                                            }
                                        </div>

                                        <div className="form-group">                                                                                    
                                            <Row>
                                                <Col span={6}>
                                                    <Translate>
                                                        {({ translate }) =>
                                                            <Button className="d-inline" onClick={() => this.props.history.push(`/home`)} style={{marginRight:20}}>{translate('public.links.cancel')}</Button>}
                                                    </Translate>
                                                </Col>

                                                <Col span={6}>
                                                    <Translate>{({ translate }) =>
                                                        <Button htmlType="submit">{translate("button.login")}</Button>}
                                                    </Translate>                                        
                                                </Col>

                                                { isLoading 
                                                    &&                                                    
                                                    <Col span={4}>
                                                        <img src={loader} style={{width:60, marginTop:-15, marginLeft: -20}}/>
                                                    </Col>
                                                }
                                            </Row>
                                        </div>

                                        <div className="form-group">
                                            <Translate>
                                                {({ translate }) =>
                                                    <Link to="/register" className="btn btn-link d-inline">{translate('public.links.signup')}</Link>}
                                            </Translate>                         
                                            <Translate>
                                                {({ translate }) =>
                                                    <Link to="/forgot" className="btn btn-link d-inline">{translate('public.links.forgot')}</Link>}
                                            </Translate>                         
                                        </div>
                                        <div className="form-group">                                            
                                            <span className="error">{error}</span>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = {    
    ...userActions,
    ...commonActions,
}; 

function mapStateToProps(state) {
    return {
      error: state.users.error,
      isLoggedInRes: state.users.isLoggedIn,
      isLoading: state.common.isLoading
    };
}

export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginPage)));
