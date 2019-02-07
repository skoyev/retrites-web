import React from 'react';
import { Translate } from "react-localize-redux";
import { Link } from 'react-router-dom';

export class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

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

    render() {
        //const { user, users } = this.props;
        const { username, password, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                Login
                <form name="form" onSubmit={this.handleSubmit}>
                        <div className="form-row">
                            <div className={'form-group col-md-4' + (submitted && !username ? ' has-error' : '')}>
                                <label htmlFor="username">Username</label>
                                <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
                                {submitted && !username &&
                                    <div className="help-block">Username is required</div>
                                }
                            </div>

                            <div className={'form-group col-md-4' + (submitted && !password ? ' has-error' : '')}>
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                                {submitted && !password &&
                                    <div className="help-block">Password is required</div>
                                }
                            </div>
                            <div className="form-group col-md-4 down-30">
                                <div className="d-inline-block">
                                    <Translate>
                                        {({ translate }) =>
                                            <Link to="/" className="btn btn-link d-inline">{translate('public.links.cancel')}</Link>}
                                    </Translate>
                                </div>                                
                            </div>
                        </div>
                    </form>

            </div>
        )
    }
}
