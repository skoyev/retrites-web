import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { PrivateRoute } from "../components/common/PrivateRoute";
import PrivateMainteinRouter from "../components/common/PrivateMainteinRouter";
import { history } from "../helpers";
import { LocalizeProvider } from "react-localize-redux";
import "./App.css";
import "./constants.css";
import { lazy, Suspense } from "react";
import { Loading } from "../components/common";
import "antd/dist/antd.css";
import PrivateNotMainteinRouter from "../components/common/PrivateNotMainteinRouter";

const LazyDashboardComponent = lazy(() =>
  import("../containers/dashboard/DashboardPage")
);
const LazyHomeComponent = lazy(() => import("../containers/home/HomePage"));
const LazyLogin = lazy(() => import("../containers/login/LoginPage"));
const LazyContactUs = lazy(() => import("../containers/contact"));
const LazyRegisterPage = lazy(() =>
  import("../containers/register/RegisterPage")
);
const LazyForgotPasswordPage = lazy(() =>
  import("../containers/forgot-password/ForgotPasswordPage")
);
//const LazyAddRetreatePage = lazy(() => import('../containers/retreate/new/AddRetreatePage'));
const LazyAddNewRetreatPage = lazy(() =>
  import("../containers/home/add/AddNewRetreatPage")
);
const LazyRetreateDetailPage = lazy(() =>
  import("../containers/retreate/RetreateDetailPage")
);
const LazySearchResultPage = lazy(() =>
  import("../containers/search/SearchResultPage")
);
const LazyAboutPage = lazy(() => import("../containers/about/AboutPage"));
const LazyResetPasswordPage = lazy(() =>
  import("../containers/forgot-password-callback/ForgotPasswordCallbackPage")
);
const LazyMaintenancePage = lazy(() => import("../containers/maintenance"));

function WaitingComponent(Component) {
  return props => (
    <Suspense fallback={<Loading text="Loading" />}>
      <Component {...props} />
    </Suspense>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log('JavaScript Constants set.');
    const root = document.querySelector(':root');
    if (root) {
      const rs = getComputedStyle(root);

      let env = rs.getPropertyValue('--env').trim().replaceAll('"', '');
      let baseUrl = rs.getPropertyValue('--base-url').trim().replaceAll('"', '');

      let homeImg = rs.getPropertyValue('--home-image').trim().replaceAll('"', '');
      let wellnessImg = rs.getPropertyValue('--home-wellness-image').trim().replaceAll('"', '');
      let contactusImg = rs.getPropertyValue('--contact-contactus-image').trim().replaceAll('"', '');
      let addMeditation1Img = rs.getPropertyValue('--add-meditation1-image').trim().replaceAll('"', '');
      let addWellnessRetreat1Img = rs.getPropertyValue('--add-wellness-retreat-image').trim().replaceAll('"', '');

      let addRetreat1Img = rs.getPropertyValue('--add-retreat-1-image').trim().replaceAll('"', '');
      let addRetreat2Img = rs.getPropertyValue('--add-retreat-2-image').trim().replaceAll('"', '');
      let addRetreat3Img = rs.getPropertyValue('--add-retreat-3-image').trim().replaceAll('"', '');
      let addRetreat4Img = rs.getPropertyValue('--add-retreat-4-image').trim().replaceAll('"', '');
      let addRetreat5Img = rs.getPropertyValue('--add-retreat-5-image').trim().replaceAll('"', '');
      let addMatchedImg = rs.getPropertyValue('--add-matched-image').trim().replaceAll('"', '');
      let addRiskFreeImg = rs.getPropertyValue('--add-risk-free-image').trim().replaceAll('"', '');

      const baseUrlEnv = `${baseUrl}/${env}`;

      root.style.setProperty('--background-home-image', `url(${baseUrlEnv}/${homeImg})`);
      root.style.setProperty('--background-wellness-image', `url(${baseUrlEnv}/${wellnessImg})`);
      root.style.setProperty('--background-contactus-image', `url(${baseUrlEnv}/${contactusImg})`);
      root.style.setProperty('--background-add-meditation1-image', `url(${baseUrlEnv}/${addMeditation1Img})`);
      root.style.setProperty('--background-add-wellness-retreat-image', `url(${baseUrlEnv}/${addWellnessRetreat1Img})`);

      root.style.setProperty('--add-retreat-1', `${baseUrlEnv}/${addRetreat1Img}`);
      root.style.setProperty('--add-retreat-2', `${baseUrlEnv}/${addRetreat2Img}`);
      root.style.setProperty('--add-retreat-3', `${baseUrlEnv}/${addRetreat3Img}`);
      root.style.setProperty('--add-retreat-4', `${baseUrlEnv}/${addRetreat4Img}`);
      root.style.setProperty('--add-retreat-5', `${baseUrlEnv}/${addRetreat5Img}`);
      root.style.setProperty('--add-matched', `${baseUrlEnv}/${addMatchedImg}`);
      root.style.setProperty('--add-risk-free', `${baseUrlEnv}/${addRiskFreeImg}`);
    }
  }

  render() {
    return (
      <div style={{ height: "100%" }}>
        <LocalizeProvider>
          <Router history={history}>
            <div style={{ height: "100%" }}>
              <PrivateRoute
                path="/dashboard"
                component={WaitingComponent(LazyDashboardComponent)}
              />
              <PrivateMainteinRouter
                path="/home"
                exact
                component={WaitingComponent(LazyHomeComponent)}
              />
              <PrivateMainteinRouter
                path="/login"
                component={WaitingComponent(LazyLogin)}
              />
              <PrivateNotMainteinRouter
                path="/maintenance"
                component={WaitingComponent(LazyMaintenancePage)}
              />
              <PrivateMainteinRouter
                path="/register"
                component={WaitingComponent(LazyRegisterPage)}
              />
              {/*<Route path="/new-retreate" component={WaitingComponent(LazyAddRetreatePage)} />*/}
              <PrivateMainteinRouter
                path="/add"
                component={WaitingComponent(LazyAddNewRetreatPage)}
              />
              <PrivateMainteinRouter
                path="/contact"
                component={WaitingComponent(LazyContactUs)}
              />
              <PrivateMainteinRouter
                path="/item/:itemID"
                component={WaitingComponent(LazyRetreateDetailPage)}
              />
              <PrivateMainteinRouter
                path="/items"
                component={WaitingComponent(LazySearchResultPage)}
              />
              <PrivateMainteinRouter
                path="/about"
                component={WaitingComponent(LazyAboutPage)}
              />
              <PrivateMainteinRouter
                path="/forgot"
                component={WaitingComponent(LazyForgotPasswordPage)}
              />
              <PrivateMainteinRouter
                path="/reset-password"
                component={WaitingComponent(LazyResetPasswordPage)}
              />
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
export { connectedApp as App };
