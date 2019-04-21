import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { PrivateRoute } from '../components/common/PrivateRoute';
import { withLocalize, Translate } from "react-localize-redux";
import { history } from '../helpers';
import { LoginPage } from '../containers/login/LoginPage';
import HomePage from '../containers/home/HomePage';
import RegisterPage  from '../containers/register/RegisterPage';
import { DashboardPage } from '../containers/dashboard/DashboardPage';
import { LocalizeProvider } from 'react-localize-redux';
import './App.css'
import AddRetreatePage from '../containers/retreate/new/AddRetreatePage';
import RetreateDetailPage from '../containers/retreate/RetreateDetailPage';

class App extends React.Component {
    
    constructor(props){
        super(props);
    }    

    render() {
        return (            
            <div>                
                <LocalizeProvider>
                    <Router history={history}>                    
                        <div>                         
                            <PrivateRoute exact path="/" component={DashboardPage} />                                
                            <Route path="/home" component={HomePage} />
                            <Route path="/login" component={LoginPage} />
                            <Route path="/register" component={RegisterPage} />                        
                            <Route path="/new-retreate" component={AddRetreatePage} />
                            <Route path="/item/:itemID" component={RetreateDetailPage} />                        
                        </div>                    
                    </Router>                
                </LocalizeProvider>
            </div>
        );
    }
}

const connectedApp = connect(null)(App);
export  { connectedApp as App }; 
