import React from 'react';
import { Translate } from "react-localize-redux";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withLocalize } from "react-localize-redux";
import {userActions} from '../../store/action'
import { history } from '../../helpers';
import '../style/Base.css'
import './index.css'
import { renderToStaticMarkup } from "react-dom/server";
import globalTranslations from "../../translations/global.json";

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
        const { error } = this.props;
        const { email, password, submitted } = this.state;
        
        return (
            <div className="container center">                
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
                                        <Translate>
                                            {({ translate }) =>
                                                <Link to="/home" className="btn btn-link d-inline">{translate('public.links.cancel')}</Link>}
                                        </Translate>
                                        <Translate>{({ translate }) =><button className="btn btn-primary">{translate("button.login")}</button>}</Translate>                                        
                                    </div>
                                    <div className="form-group">
                                        <Translate>
                                            {({ translate }) =>
                                                <Link to="/register" className="btn btn-link d-inline">{translate('public.links.signup')}</Link>}
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
        )
    }
}

const mapDispatchToProps = {    
    ...userActions
}; 

function mapStateToProps(state) {
    return {
      error: state.users.error,
      isLoggedInRes: state.users.isLoggedIn
    };
}

export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(LoginPage));
