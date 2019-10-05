import React from 'react';
import {loadable, Loadable} from 'react-loadable';
import { Router,Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { PrivateRoute } from '../components/common/PrivateRoute';
import { withLocalize, Translate } from "react-localize-redux";
import { history } from '../helpers';
import LoginPage  from '../containers/login/LoginPage';
import HomePage from '../containers/home/HomePage';
import RegisterPage  from '../containers/register/RegisterPage';
import { LocalizeProvider } from 'react-localize-redux';
import './App.css'
import AddRetreatePage from '../containers/retreate/new/AddRetreatePage';
import RetreateDetailPage from '../containers/retreate/RetreateDetailPage';
import {SearchResultPage} from '../containers';
import { lazy, Suspense } from "react";
import AddNewRetreatPage from '../containers/home/add/AddNewRetreatPage';

const LazyDashboardComponent = lazy(() => import('../containers/dashboard/DashboardPage'));

function WaitingComponent(Component) {
    return props => (
      <Suspense fallback={<div>Loading...</div>}>
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
                            <PrivateRoute exact path="/dashboard" component={WaitingComponent(LazyDashboardComponent)} />
                            <Route path="/home" component={HomePage} />
                            <Route path="/login" component={LoginPage} />
                            <Route path="/register" component={RegisterPage} />                        
                            <Route path="/new-retreate" component={AddRetreatePage} />
                            <Route path="/add" component={AddNewRetreatPage} />
                            <Route path="/item/:itemID" component={RetreateDetailPage} />                        
                            <Route exact path="/items/:itemType" component={SearchResultPage} />                        
                            <Route path="/" render={ history.push('/home')} />
                        </div>                    
                    </Router>                
                </LocalizeProvider>
            </div>
        );
    }
}

const connectedApp = connect(null)(App);
export  { connectedApp as App }; 
