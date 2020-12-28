import React from 'react';
import { Router,Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { PrivateRoute } from '../components/common/PrivateRoute';
import  PrivateMainteinRouter  from '../components/common/PrivateMainteinRouter';
import { history } from '../helpers';
import { LocalizeProvider } from 'react-localize-redux';
import './App.css'
import { lazy, Suspense } from "react";
import { Loading } from '../components/common';
import "antd/dist/antd.css";
import PrivateNotMainteinRouter from '../components/common/PrivateNotMainteinRouter';

const LazyDashboardComponent = lazy(() => import('../containers/dashboard/DashboardPage'));
const LazyHomeComponent = lazy(() => import('../containers/home/HomePage'));
const LazyLogin = lazy(() => import('../containers/login/LoginPage'));
const LazyContactUs = lazy(() => import('../containers/contact'));
const LazyRegisterPage = lazy(() => import('../containers/register/RegisterPage'));
const LazyForgotPasswordPage = lazy(() => import('../containers/forgot-password/ForgotPasswordPage'));
//const LazyAddRetreatePage = lazy(() => import('../containers/retreate/new/AddRetreatePage'));
const LazyAddNewRetreatPage = lazy(() => import('../containers/home/add/AddNewRetreatPage'));
const LazyRetreateDetailPage = lazy(() => import('../containers/retreate/RetreateDetailPage'));
const LazySearchResultPage = lazy(() => import('../containers/search/SearchResultPage'));
const LazyAboutPage = lazy(() => import('../containers/about/AboutPage'));
const LazyResetPasswordPage = lazy(() => import('../containers/forgot-password-callback/ForgotPasswordCallbackPage'));
const LazyMaintenancePage = lazy(() => import('../containers/maintenance'));

function WaitingComponent(Component) {
    return props => (
      <Suspense fallback={<Loading text="Loading"/>}>
        <Component {...props} />
      </Suspense>
    );
  }

class App extends React.Component {
    
    constructor(props){
        super(props);
    }   
    
    render() {
        return (            
            <div style={{height:'100%'}}>                                         
                <LocalizeProvider>
                    <Router history={history}>                    
                        <div style={{height:'100%'}}>                         
                                <PrivateRoute path="/dashboard" component={WaitingComponent(LazyDashboardComponent)} />
                                <PrivateMainteinRouter path="/home" exact component={WaitingComponent(LazyHomeComponent)} />
                                <PrivateMainteinRouter path="/login" component={WaitingComponent(LazyLogin)} />
                                <PrivateNotMainteinRouter path="/maintenance" component={WaitingComponent(LazyMaintenancePage)} />
                                <PrivateMainteinRouter path="/register" component={WaitingComponent(LazyRegisterPage)} />                        
                                {/*<Route path="/new-retreate" component={WaitingComponent(LazyAddRetreatePage)} />*/}
                                <PrivateMainteinRouter path="/add" component={WaitingComponent(LazyAddNewRetreatPage)} />
                                <PrivateMainteinRouter path="/contact" component={WaitingComponent(LazyContactUs)} />
                                <PrivateMainteinRouter path="/item/:itemID" component={WaitingComponent(LazyRetreateDetailPage)} />                        
                                <PrivateMainteinRouter path="/items" component={WaitingComponent(LazySearchResultPage)} />                        
                                <PrivateMainteinRouter path="/about" component={WaitingComponent(LazyAboutPage)} />                        
                                <PrivateMainteinRouter path="/forgot" component={WaitingComponent(LazyForgotPasswordPage)} />                        
                                <PrivateMainteinRouter path="/reset-password" component={WaitingComponent(LazyResetPasswordPage)} />                        
                                {/*<Route path="/" render={ history.push('/home')} />*/}
                                <Route exact path="/">
                                    <Redirect to="/home" />
                                </Route>                                
                        </div>                    
                    </Router>                
                </LocalizeProvider>
            </div>
        );
    }
}

const connectedApp = connect(null)(App);
export  { connectedApp as App }; 
