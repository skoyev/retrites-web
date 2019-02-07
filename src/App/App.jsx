import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { PrivateRoute } from '../components/PrivateRoute';

import { history } from '../helpers';
import { LoginPage } from '../pages/login/LoginPage';
import HomePage from '../pages/home/HomePage';
import RegisterPage  from '../pages/register/RegisterPage';
import { DashboardPage } from '../pages/dashboard/DashboardPage';
import { LocalizeProvider } from 'react-localize-redux';
import './App.css'
import { AddRetreatePage } from '../pages/retreate/new/AddRetreatePage';

class App extends React.Component {

    render() {
        //const { alert } = this.props;
        return (            
            <div className="container">                
                <LocalizeProvider>
                    <Router history={history}>                    
                        <div>                         
                            <PrivateRoute exact path="/" component={DashboardPage} />                                
                            <Route path="/home" component={HomePage} />
                            <Route path="/login" component={LoginPage} />
                            <Route path="/register" component={RegisterPage} />                        
                            <Route path="/new-retreate" component={AddRetreatePage} />                        
                        </div>                    
                    </Router>                
                </LocalizeProvider>
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