import React, { PureComponent } from 'react';
import Face from './images/facebook.png';
import Instagram from './images/instagram.png';
import Phone from './images/phone.png';
// Import Style
import styles from './Footer.css';

// Import Images

class Footer extends PureComponent {
  render() {
    return (
      <div className={styles.footer}>
        <a href="https://www.facebook.com/tobcity/"><img className={styles.face} src={Face} alt="Redes Sociales Facebook" /></a>
        <a href="https://www.instagram.com/tobcity_co/"><img className={styles.insta} src={Instagram} alt="Redes Sociales Instagram" /></a>
        <a href="https://wa.me/573178544251"><img className={styles.phone} src={Phone} alt="Redes Sociales Whatsapp" /></a>
      </div>
    );
  }
}

export default Footer;
