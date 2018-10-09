import React, { PureComponent } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FormLogin from './LoginForm';

class LoginPage extends PureComponent {
  render() {
    return (
      <div className="LoginForm">
        <h1>Bienvenido de vuelta a tobcity, por favor valida tus datos y empieza a viajar</h1>
        <FormLogin />
        <p>Si no estas registrado haz click <Link to="/signup">AQUI</Link></p>
        {this.props.signupmsg}
      </div>
		);
  }
}
function mapStateToProps(store) {
  return {
    signupmsg: store.auth.msg,
  };
}

LoginPage.propTypes = {
  signupmsg: PropTypes.string,
};

export default connect(mapStateToProps)(LoginPage);
