import React from 'react';
import { Translate } from "react-localize-redux";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withLocalize } from "react-localize-redux";
import {userActions} from '../../store/action'

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);        
    }  
    
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
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

    render() {
        const { error } = this.props;
        const { username, password, submitted } = this.state;
        
        return (
            <div className="container">
                <div className="row justify-content-center align-items-center new-retreate">
                    <div className="col-4">
                        <div className="card">
                            <div className="card-body">
                                <Translate>{({ translate }) =><h2>{translate("header.login")}</h2>}</Translate>
                                <form name="form" onSubmit={this.handleSubmit}>
                                    <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                                        <label htmlFor="username">Username</label>
                                        <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
                                        {submitted && !username &&
                                            <div className="help-block">Username is required</div>
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
                                        {error}
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
      error: state.users.error
    };
}

export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(LoginPage));
