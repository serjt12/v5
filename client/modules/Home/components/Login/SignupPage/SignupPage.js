import React, { PureComponent } from 'react';
import SignUpForm from './SignupForm';

class SignupPage extends PureComponent {
  render() {
    return (
      <div className="SignupForm">
        <h1>Bienvenido a Tobcity, te invitamos a registrarte: </h1>
        <SignUpForm />
      </div>
    );
  }
}

export default SignupPage;
