import React from 'react';
import { userActions, itemActions } from '../../store/action';
import { Link, withRouter } from 'react-router-dom';
import { Menu, Dropdown, Button } from 'antd';
import { connect } from 'react-redux'
import { Translate } from "react-localize-redux";
import { SimpleHeader } from '../../components/public';
import '../style/RegisterPage.css'
import { history } from '../../helpers';
import '../style/Base.css'
import { withLocalize } from "react-localize-redux";
import ReCAPTCHA from "react-google-recaptcha";
import { configConstants, commonConstants } from '../../constants';
import AES from 'crypto-js/aes';
import { renderToStaticMarkup } from "react-dom/server";
import globalTranslations from "../../translations/global.json";

const validEmailRegex = 
  RegExp(/^(([^<>()[\].,;:\s@"]+(.[^<>()[].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+.)+[^<>()[\].,;:\s@"]{2,})$/i);

window.recaptchaRef = React.createRef();  

const typeMenu = (data, handleMenuClick, name) => {
    return (
        <Menu onClick={handleMenuClick}>
            {data.map((d, index) => <Menu.Item data={data} name={name} key={index} id={d.id}>{d.name}</Menu.Item>)}            
        </Menu>  
    )
}

class RegisterPage extends React.Component {

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
            user: {
                firstName: '',
                lastName: '',
                password: '',
                confirmPassword: '',
                email: ''
            },
            errors: {
                firstName: '',
                lastName: '',
                confirmPassword: '',
                password: '',
                email: ''
            },
            submitted: false,
            isValidForm: false,
            disabled: 'disabled',
            isCaptchaValid: false,
            selectedType: {id:0, name: 'Please Select'},
            userAlreadyRegisteredEmailErrorMsg: 'This user email is already been registered.'
        };

        this.timer = '';
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCaptchaOnChange = this.handleCaptchaOnChange.bind(this);
    }

    componentWillReceiveProps(nextProps){
        /*
        if(nextProps.shouldRedirectHomePage) {            
            history.push('/home');
        }
        */
    }    

    handleChange(event) {
        const { name, value }  = event.target;
        const { user, errors, isCaptchaValid } = this.state;

        switch (name) {
            case 'firstName': 
              errors.firstName = 
                value.length <= 3
                  ? 'First Name must greater 3 characters long!'
                  : '';
              break;
            case 'lastName': 
              errors.lastName = 
                value.length <= 1
                  ? 'Last Name must greater 1 characters long!'
                  : '';
              break;
            case 'email': 
                let isValidEmail = validEmailRegex.test(value);
                errors.email = 
                    isValidEmail
                    ? ''
                    : 'Email is not valid!';
                if(isValidEmail){
                    // check on server if email already exist
                    clearTimeout(this.timer);
                    this.timer = setTimeout(
                        () => this.props.isUserEmailAlreadyRegistered(value), 
                        2000);                    
                }
              break;
            case 'password': 
              errors.password = 
                value.length < 8
                  ? 'Password must be 8 characters long!'
                  : '';              
              break;
            case 'confirmPassword': 
              errors.confirmPassword = 
                user.password === value
                  ? '' : value.length > 0 ? 'Password does not match!' : '';
              break;
            default:
              break;
        }        

        this.setState({
            errors, [name]: value,
            user: {
                ...user,
                [name]: value
            },
            isValidForm: errors.firstName.length === 0 &&
                            errors.lastName.length === 0 &&
                                errors.email.length === 0 &&
                                    errors.password.length === 0 &&
                                        errors.confirmPassword.length === 0 && isCaptchaValid
        }, () => {
            this.setState({disabled: this.state.isValidForm ? '' : 'disabled'})
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user, isValidForm, selectedType } = this.state;
        const { register } = this.props;

        if (isValidForm) {
            user.roleId = selectedType.id;
            user.password = AES.encrypt(user.password, commonConstants.SECRET_PASSPHRASE).toString();
            window.recaptchaRef.current.reset();
            let copyUser = Object.assign({}, user);
            delete copyUser.confirmPassword;
            register(copyUser);
            //history.push('/home');
        }
    }   
    
    handleCaptchaOnChange = () => {
        this.setState({isCaptchaValid: true}, () => this.validate())
    }   
    
    setSelectedType = (e) => {
        this.setState({selectedType:e}, () => this.validate())
    }

    validate = () => {
        let {errors, isCaptchaValid} = this.state;
        let {isUserAlreadyRegisteredEmail} = this.props;

        this.setState({isValidForm: 
            errors.firstName.length === 0 &&
                errors.lastName.length === 0 &&
                    errors.email.length === 0 &&
                        errors.password.length === 0 &&
                            errors.confirmPassword.length === 0 && 
                                isCaptchaValid && !isUserAlreadyRegisteredEmail
        }, () => {
            this.setState({disabled: this.state.isValidForm ? '' : 'disabled'})
        });

    }
        
    render() {
        const {userRegisterError, types, isUserAlreadyRegisteredEmail, retreatByCountries} = this.props;
        const { user, submitted, errors, disabled, selectedType, userAlreadyRegisteredEmailErrorMsg } = this.state;

        return (
        <React.Fragment>
            <SimpleHeader/>
            <div className="container center" style={{marginTop: 25}}>
                <div className="row justify-content-center align-items-center new-retreate">
                    <div className="col-4">
                        <div className="card">
                            <div className="card-body">
                                <Translate>{({ translate }) =><h2>{translate("header.newuser")}</h2>}</Translate>
                                <form name="form" onSubmit={this.handleSubmit}>
                                    <div className={'form-group' + (submitted && !user.firstName ? ' has-error' : '')}>
                                        <label htmlFor="firstName">First Name *</label>
                                        <input required type="text" className="form-control" name="firstName" value={user.firstName} onChange={this.handleChange} />
                                        {submitted && !user.firstName &&
                                            <div className="help-block">First Name is required</div>
                                        }
                                        {errors.firstName.length > 0 && <span className='error'>{errors.firstName}</span>}
                                    </div>
                                    <div className={'form-group' + (submitted && !user.lastName ? ' has-error' : '')}>
                                        <label htmlFor="lastName">Last Name *</label>
                                        <input required type="text" className="form-control" name="lastName" value={user.lastName} onChange={this.handleChange} />
                                        {submitted && !user.lastName &&
                                            <div className="help-block">Last Name is required</div>
                                        }
                                        {errors.lastName.length > 0 && <span className='error'>{errors.lastName}</span>}
                                    </div>
                                    <div className={'form-group' + (submitted && !user.email ? ' has-error' : '')}>
                                        <label htmlFor="email">Email *</label>
                                        <input required type="email" className="form-control" name="email" value={user.email} onChange={this.handleChange} />
                                        {submitted && !user.email &&
                                            <div className="help-block">Email is required</div>
                                        }
                                        {errors.email.length > 0 && <span className='error'>{errors.email}</span>}
                                        {isUserAlreadyRegisteredEmail && <span className='error'>{userAlreadyRegisteredEmailErrorMsg}</span>}
                                    </div>
                                    <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                                        <label htmlFor="password">Password *</label>
                                        <input required type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
                                        {submitted && !user.password &&
                                            <div className="help-block">Password is required</div>
                                        }
                                        {errors.password.length > 0 && <span className='error'>{errors.password}</span>}
                                    </div>
                                    <div className={'form-group' + (submitted && !user.confirmPassword ? ' has-error' : '')}>
                                        <label htmlFor="confirmPassword">Confirm Password *</label>
                                        <input required type="password" className="form-control" name="confirmPassword" value={user.confirmPassword} onChange={this.handleChange} />
                                        {submitted && !user.confirmPassword &&
                                            <div className="help-block">Password is not matching</div>
                                        }
                                        {errors.confirmPassword.length > 0 && <span className='error'>{errors.confirmPassword}</span>}
                                    </div>
                                    
                                    <div className="form-group">
                                        <label htmlFor="type">What Are You Planning To Do ? *</label>
                                        <div>
                                            <Dropdown.Button id="type" overlay={typeMenu(types, (v) => this.setSelectedType(v.item.props.data[v.key]))}>
                                                <span>{selectedType.name}</span>
                                            </Dropdown.Button>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <ReCAPTCHA
                                            onExpired={()=>this.setState({isCaptchaValid:false}, () => this.validate())}
                                            ref={window.recaptchaRef}
                                            sitekey={configConstants.CAPTCHA_KEY}
                                            onChange={this.handleCaptchaOnChange}/>                            
                                    </div>
                                    <div className="form-group"> 
                                        <Translate>
                                            {({ translate }) =>
                                                <Button className="d-inline" onClick={() => this.props.history.push(`/home`)} style={{marginRight:20}}>{translate('public.links.cancel')}</Button>}
                                        </Translate>
                                        <Translate>{({ translate }) =>
                                                <Button htmlType="submit" disabled={disabled}>{translate("button.submit")}</Button>}
                                        </Translate>                                                                                                              
                                    </div>
                                    {userRegisterError && userRegisterError.response && 
                                        <div className="form-group">
                                            <span className='error'>{userRegisterError.response.data.message}</span>
                                        </div>
                                    }
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

function mapStateToProps(state) {
    return {
        types: commonConstants.USER_ROLES,
        userRegisterError: state.users.userRegisterError,
        shouldRedirectHomePage: state.users.shouldRedirectHomePage,
        isUserAlreadyRegisteredEmail: state.users.isUserAlreadyRegisteredEmail,
        retreatByCountries: state.items.retreatByCountries
    };
}

const mapDispatchToProps = {    
    ...userActions,
    ...itemActions
};  
  
export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(withRouter(RegisterPage)));