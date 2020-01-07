import React from 'react';
import * as Redux from 'react-redux';
import { Link } from 'react-router-dom';
import { userActions } from '../../store/action';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { history } from '../../helpers';
import { Translate } from 'react-localize-redux';

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
        this.handleHome = this.handleHome.bind(this);
    }    

    handleLogout = (e) => {
        e.preventDefault();
        this.setState({ logedOut: true });
        this.props.logout();
    }

    handleHome = (e) => {
        history.push('/home');
    }

    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
        return (
            <div className="col-md-12">                
                <button className="btn btn-primary" style={{float:'right', marginTop: 10}} onClick={this.handleLogout}>Logout</button>
                <button className="btn btn-primary" style={{float:'right', marginTop: 10, marginRight: 10}} onClick={this.handleHome}>Home</button>
            </div>
        );
    }
} 

const mapDispatchToProps = {    
    ...userActions
};  
  
export default connect(null, mapDispatchToProps)(PrivateHeader);