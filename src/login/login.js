import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import FirebaseUI from './FirebaseUI';
import firebase from 'firebase';
import AppConfig from '../config/AppConfig';

import Paper from 'material-ui/Paper';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import '../css/colors.css'

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false
    };

    firebase.auth().onAuthStateChanged((user) => {
      this.setUser(user);
    });

  }

  componentDidMount() {
    AppConfig.setTitle("Login");
  }
  componentWillUnmount() {
    AppConfig.setTitle();

  }

  onUserSignin = (user) => {
    this.setUser(user);
  }

  setUser = (user) => {
    if (user) {
      this.props.onUpdate(user);
      this.setState({ redirectToReferrer: true });
    }
  }


  responseGoogleSuccess(resp) {
    // console.log(resp);
  }
  responseGoogleFailure(resp) {

  }


  render() {
    const { redirectToReferrer } = this.state;
    if (redirectToReferrer) {
      return (
        <Redirect to='/' />
      )
    }

    const APPNAME = AppConfig.NAME;
    
    const style = {
      margin: '0 auto',
      width: '300px',
      height: '400px',
      position: 'relative',
      top: '100px',
      paddingTop:'100px'
    };

    const topStyles = {
      height: '100%'
    } 

    return (
      <MuiThemeProvider>
        <div className='bg-blue-200' style={topStyles}>
          <Paper style={style} zDepth={1} >
            <FirebaseUI onSignIn={this.setUser} authUi={this.props.authUi}  />
          </Paper>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Login;