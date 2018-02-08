import React, { Component } from 'react';
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

class FirebaseUI extends Component {

  componentDidMount() {
    var self = this;
    let authUi = this.props.authUi;
    var uiConfig = {
      'callbacks': {
        'signInSuccess': function(user) {
          if (self.props.onSignIn) {
            self.props.onSignIn(user);
          }
          // no redirect
          return false;
        },
          uiShown: function() {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById('loader').style.display = 'none';
          }
      },
      'signInFlow': 'popup',
      credentialHelper: firebaseui.auth.CredentialHelper.NONE,
      'signInOptions':[
      // TODO(developer): Remove the providers you don't need for your app.
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      {
        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        scopes: ['https://www.googleapis.com/auth/plus.login'],
        customParameters: {
          // Forces account selection even when one account
          // is available.
          prompt: 'select_account'
        }
      },
      // {
      //   provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      //   scopes :[
      //     'public_profile',
      //     'email',
      //     'user_likes',
      //     'user_friends'
      //   ]
      // },
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      // {
      //   provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      //   // Whether the display name should be displayed in Sign Up page.
      //   requireDisplayName: true
      // }
    ],
    // Terms of service url.
    'tosUrl': 'https://www.google.com'
    };
    authUi.reset();
    authUi.start('#firebaseui-container', uiConfig);
  }

  componentWillUnmount() {
    let authUi = this.props.authUi;
    authUi.reset();
  }

  render() {
    return (
      <div className="fb-ui-wrapper" style={this.props.style}>
        <div id="firebaseui-container"></div>
        <div id="loader">Loading...</div>
      </div>
    );
  }
}

export default FirebaseUI;

FirebaseUI.defaultProps = {
  style :{}
}