import React, { PureComponent } from 'react';
import SignUpForm from './SignupForm';

class SignupPage extends PureComponent {
  render() {
    console.log(this.props)
    return (
      <div>
        <h1>Bienvenido a Tobcity, te invitamos a registrarte: </h1>
        <SignUpForm router={this.props.router} />
      </div>
    );
  }
}

export default (SignupPage);
