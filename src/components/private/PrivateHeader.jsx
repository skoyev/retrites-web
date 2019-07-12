import React from 'react';
import * as Redux from 'react-redux';
import { Link } from 'react-router-dom';
import { userActions } from '../../store/action';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class PrivateHeader extends React.Component {

    constructor(props) {
        super(props);

        // reset login status
        //this.props.dispatch(userActions.logout());

        this.state = {
            username: '',
            logedOut: false
        };

        this.handleLogout = this.handleLogout.bind(this);
    }    

    handleLogout = (e) => {
        e.preventDefault();

        this.setState({ logedOut: true });
        const { logout } = this.props;
        logout();
    }

    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
        return (
            <div className="col-md-12">
                <button className="btn btn-primary" style={{float:'right', marginTop: 10}} onClick={this.handleLogout}>Logout</button>
            </div>
        );
    }
} 

const mapDispatchToProps = {    
    ...userActions
};  
  
export default connect(null, mapDispatchToProps)(PrivateHeader);