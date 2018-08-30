import React, { PureComponent } from 'react';
import SignUpForm from './SignupForm';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class SignupPage extends PureComponent {
  render() {
    const Success = (this.props.auth.user !== null && this.props.auth.user.local) ? this.props.auth.user.local.cellphone : null;
    const errormsg = (this.props.auth.user !== null && this.props.auth.user.error) ? (this.props.auth.user.error) : null;
    return (
      <div>
        <h1>Bienvenido a Tobcity, te invitamos a registrarte: </h1>
        <SignUpForm />
        {(errormsg) ? (<div>{errormsg} dirigete a <Link to="/login">Login</Link> para ingresar</div>) : null}
        {(Success) ? (<div>El numero {Success} fue exitosamente registrado Ahora ingresa en <Link to="/login">Login</Link></div>) : null}
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(SignupPage);
