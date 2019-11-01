import React, {Component} from 'react';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator, Authenticator } from 'aws-amplify-react';
Amplify.configure(awsconfig);

class SignIn extends Component {
  render() {
    return (
      <Authenticator />
    );
  }
}

export default withAuthenticator(SignIn);