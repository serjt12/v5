import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import TravelCreateWidget from '../../../Travel/components/TravelCreateWidget/TravelCreateWidget';
import { addTravelRequest } from '../../../Travel/TravelActions';
import { toggleAddTravel } from '../../../App/AppActions';
import LoginFace from './images/loginfacebook.png'
import LoginGoogle from './images/logingmail.png'
import LoginCell from './images/login-celular.png'
// Import Style
import styles from './Login.css';

class Login extends PureComponent {
  handleAddTravel = (name, title, content) => {
    this.props.dispatch(toggleAddTravel());
    this.props.dispatch(addTravelRequest({ name, title, content }));
  };
  render() {
    const { props: { auth: { currentUser } } } = this;
    const authButton = currentUser ? (
      <div>
        <Link className={styles.toprofile} to="/profile"><span>Ve a tu Perfil</span></Link>
        <a className={styles.logout} href="api/logout"><FormattedMessage id="logout" /></a>
      </div>
    ) : (
      <div className={styles.accessbtn}>
        <a className={styles.google} href="/auth/google"><img src={LoginGoogle} alt="Ingreso con google " /></a>
        <a className={styles.face} href="/auth/facebook"><img src={LoginFace} alt="Ingreso con facebook" /></a>
        <Link className={styles.cell} href="/login"><img src={LoginCell} alt="Ingreso con celular" /></Link>
      </div>
    );
    // console.log(this.props)
    return (
      <div>
        <TravelCreateWidget addTravel={this.handleAddTravel} showAddTravel={this.props.app.showAddTravel} />
        <div className={styles['login-container']}>
          {authButton}
        </div>
      </div>
    );
  }

}

function mapStateToProps(store) {
  return {
    ...store,
    auth: store.auth,
  };
}

export default connect(mapStateToProps)(Login);
