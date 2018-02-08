import React,{Component} from 'react';
import {
  BrowserRouter as Router,
  Route, 
  Switch,
  Redirect
} from 'react-router-dom';
import { config } from './config/firebaseConfig'
import Login from './login/login'
import AppConfig from './config/AppConfig';
import MaterialSpinner from './loading/material-spinner';
import ProtectedContent from './ProtectedContent';
 
import './css/index.css' 

var firebase = require("firebase");
var firebaseui = require('firebaseui');
require("firebase/auth");
require("firebase/database");


class App extends Component {

  constructor(props) {
    super(props);
    this.mounted = false;

    let year = 2017;
    let thisYear = new Date().getFullYear();

    if (thisYear > year) {
      year = `${year}-${thisYear} `
    }


    this.state = {
      USER: null,
      APP: {
        initialize: false
      },
      copyright: {
        name: `Â© ${year}`,
        companyName: ' Limited',
        text: `Â© ${year}  Limited. All rights reserved.`,
        url: 'https://www..com/'
      },
      token: null,
    } 

    firebase.initializeApp(config);

    this.authUi = new firebaseui.auth.AuthUI(firebase.auth());

    firebase.auth().onAuthStateChanged((user) => {
      this.updateUser(user);
      this.getToken();

      this.setAppInit(true);
      if (user === null) {
        return;
      }

    });
  } 

  updateUser = (user) => {
    this.setState({ USER: user });
  }
    
  logout = () => {
    this.setState({ USER: null, token: null });
    firebase.auth().signOut();

    // AppStorage.clearAllStorage();
    window.location.href = "/";

  }

  setAppInit = (isInit) => {
    this.setState(() => (({ APP: { initialize: isInit } })));
  }
  componentDidMount() {
    this.mounted = true;
    AppConfig.setTitle();
  }

  componentWillUnmount() {
    this.mounted = false; 
  }


  getToken = () => {
    let self = this;
    let currentUser = firebase.auth().currentUser;
    if (currentUser) {
      firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function (idToken) {
        // console.log(idToken);
        window.__Token = idToken;
        self.setToken(idToken);
        self.timeout = 900000; // 15 min
        self.startTimer();
      }).catch(function (error) {

      });
    }
  }

  setToken = (idToken)=> {
    if (this.mounted === false) {
      return;
    }
    this.setState(function () { return { token: idToken }; });
  }
  
  render() {
    const { APP } = this.state;
    // Is user authenticated
    const isAuthenticated = this.state.USER !== null;
    // use isAuthenticated and has permission
    const userHasPermissions = true;

    if (APP.initialize === false) {
      return (<MaterialSpinner text="Logging you in..." x="14" />);
    }

    return (
      <Router>
        <div style={{
          height: '100%'
        }}>
          <Switch>
            <Route exact path="/login" render={() => <Login USER={this.state.USER} onUpdate={this.updateUser} copyright={this.state.copyright} authUi={this.authUi} />} />

            <PrivateRoute path="/"
              component={ProtectedContent}
              userHasPermissions={userHasPermissions}
              isAuthenticated={isAuthenticated}
              USER={this.state.USER}
              logout={this.logout}
              onchildUpdate={this.childUpdate}
              copyright={this.state.copyright}
              token={this.state.token}

            />

          </Switch>
        </div>
      </Router>
    );

  }
}

const PrivateRoute = ({ component: Component, isAuthenticated, userHasPermissions, ...rest }) => {
  let pathName = encodeURIComponent(window.location.pathname);
  let redirect = pathName === '' ? null : ('?redirect=' + pathName);

  // redirect if user is not isAuthenticated = false or userHasPermissions = false
  let redirectToLogin = "/login" + redirect;

  let route = <Route {...rest} render={props => {

    if (isAuthenticated === false) return <Redirect to={redirectToLogin} />

    if (userHasPermissions) return <Component {...props} {...rest} />

    // users without permission go here
    return <Redirect to='/welcome' />
  }} />
  return route;
}

export default App;