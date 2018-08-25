import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './Login.css';

class Login extends PureComponent {
  render() {
    const { props: { auth } } = this;
    const authButton = auth ? (
      <a className={styles.logout} href="api/logout"><FormattedMessage id="logout" /></a>
    ) : (
      <div className={styles.accessbtn}>
        <a className={styles.google} href="/auth/google"><FormattedMessage id="logingoogle" /></a>
        <a className={styles.face} href="/auth/facebook"><FormattedMessage id="loginface" /></a>
        <a className={styles.cell} href="/login"><FormattedMessage id="cellphonelogin" /></a>
      </div>
    );
    // console.log(this.props)
    return (
      <div>
        <div className={styles['login-container']}>
          {authButton}
        </div>
      </div>
    );
  }

}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Login);
