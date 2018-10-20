import React, { PureComponent } from 'react';
import styles from './home.css';
import Terms from './Terms';
import Fondo from './images/fondo.png';
import Logo from './images/logo.png';

class Policies extends PureComponent {
  render() {
    return (
      <div className={styles.policontainer}>
        <div>
          <img className={styles.logo} src={Logo} alt="Tobcity Divide Tus gastos" />
        </div>
        <h1>TERMINOS Y CONDICIONES</h1>
        <img src={Fondo} className={styles.bg} alt="Tobcity Terminos y Condiciones" />
        <div className={styles.termcontainer}>
          <div className={styles.terms}>{Terms.text}</div>
        </div>
      </div>
    );
  }

}

export default Policies;
