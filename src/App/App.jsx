import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { PrivateRoute } from '../components/PrivateRoute';

import { history } from '../helpers';
import { LoginPage } from '../pages/login/LoginPage';
import { HomePage } from '../pages/home/HomePage';
import RegisterPage  from '../pages/register/RegisterPage';
import { DashboardPage } from '../pages/dashboard/DashboardPage';

class App extends React.Component {

    render() {
        //const { alert } = this.props;
        return (            
            <div className="jumbotron">                
                <Router history={history}>                    
                    <div>                         
                        <PrivateRoute exact path="/" component={DashboardPage} />                                
                        <Route path="/home" component={HomePage} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />                        
                    </div>                    
                </Router>                
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 