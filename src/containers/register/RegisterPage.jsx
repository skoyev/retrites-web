import React from 'react';
import { userActions } from '../../store/action';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { Translate } from "react-localize-redux";
import '../style/RegisterPage.css'
import { history } from '../../helpers';

const validEmailRegex = 
  RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

class RegisterPage extends React.Component {

    constructor(props) {
        super(props);    

        this.state = {
            user: {
                firstName: '',
                lastName: '',
                username: '',
                password: '',
                emailAddress: ''
            },
            errors: {
                firstName: '',
                lastName: '',
                username: '',
                password: '',
                emailAddress: ''
            },
            submitted: false,
            isValidForm: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.shouldRedirectHomePage) {            
            history.push('/home');
        }
    }    

    handleChange(event) {
        const { name, value } = event.target;
        const { user, errors } = this.state;

        switch (name) {
            case 'firstName': 
              errors.firstName = 
                value.length <= 3
                  ? 'First Name must greater 3 characters long!'
                  : '';
              break;
            case 'emailAddress': 
              errors.emailAddress = 
                validEmailRegex.test(value)
                  ? ''
                  : 'Email is not valid!';
              break;
            case 'password': 
              errors.password = 
                value.length < 8
                  ? 'Password must be 8 characters long!'
                  : '';
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
                                errors.emailAddress.length === 0 &&
                                    errors.password.length === 0 &&
                                        errors.username.length === 0
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user, isValidForm } = this.state;
        const { register } = this.props;
        if (isValidForm) {
            //dispatch(userActions.register(user));
            register(user);
        }
    }
    
        
    render() {
        const {userRegisterError} = this.props;
        const { user, submitted, errors } = this.state;
        return (
        <div className="container">
            <div className="row justify-content-center align-items-center new-retreate">
                <div className="col-4">
                    <div className="card">
                        <div className="card-body">
                            <Translate>{({ translate }) =><h2>{translate("header.newuser")}</h2>}</Translate>
                            <form name="form" onSubmit={this.handleSubmit}>
                                <div className={'form-group' + (submitted && !user.firstName ? ' has-error' : '')}>
                                    <label htmlFor="firstName">First Name</label>
                                    <input type="text" className="form-control" name="firstName" value={user.firstName} onChange={this.handleChange} />
                                    {submitted && !user.firstName &&
                                        <div className="help-block">First Name is required</div>
                                    }
                                    {errors.firstName.length > 0 && <span className='error'>{errors.firstName}</span>}
                                </div>
                                <div className={'form-group' + (submitted && !user.lastName ? ' has-error' : '')}>
                                    <label htmlFor="lastName">Last Name</label>
                                    <input type="text" className="form-control" name="lastName" value={user.lastName} onChange={this.handleChange} />
                                    {submitted && !user.lastName &&
                                        <div className="help-block">Last Name is required</div>
                                    }
                                    {errors.lastName.length > 0 && <span className='error'>{errors.lastName}</span>}
                                </div>
                                <div className={'form-group' + (submitted && !user.emailAddress ? ' has-error' : '')}>
                                    <label htmlFor="emailAddress">Email</label>
                                    <input type="email" className="form-control" name="emailAddress" value={user.emailAddress} onChange={this.handleChange} />
                                    {submitted && !user.emailAddress &&
                                        <div className="help-block">Email is required</div>
                                    }
                                    {errors.emailAddress.length > 0 && <span className='error'>{errors.emailAddress}</span>}
                                </div>
                                <div className={'form-group' + (submitted && !user.username ? ' has-error' : '')}>
                                    <label htmlFor="username">Username</label>
                                    <input type="text" className="form-control" name="username" value={user.username} onChange={this.handleChange} />
                                    {submitted && !user.username &&
                                        <div className="help-block">Username is required</div>
                                    }
                                    {errors.username.length > 0 && <span className='error'>{errors.username}</span>}
                                </div>
                                <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
                                    {submitted && !user.password &&
                                        <div className="help-block">Password is required</div>
                                    }
                                    {errors.password.length > 0 && <span className='error'>{errors.password}</span>}
                                </div>
                                <div className="form-group">
                                    {userRegisterError && userRegisterError.response && <span className='error'>{userRegisterError.response.data.message}</span>}
                                    <Link to="/home" className="btn btn-link">Cancel</Link>
                                    <button className="btn btn-primary">Register</button>                                    
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

function mapStateToProps(state) {
    return {
        userRegisterError: state.users.userRegisterError,
        shouldRedirectHomePage: state.users.shouldRedirectHomePage
    };
}

const mapDispatchToProps = {    
    ...userActions
};  
  
export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);