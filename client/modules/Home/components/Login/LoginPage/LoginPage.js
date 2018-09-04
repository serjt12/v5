import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import FormLogin from './LoginForm';

class LoginPage extends Component {
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
  console.log(store)
  return {
    signupmsg: store.auth.msg,
  };
}

export default connect(mapStateToProps)(LoginPage);
