import React from 'react';
import Face from './images/facebook.png';
import Google from './images/google.png';
import Twitter from './images/twitter.png';
import Instagram from './images/instagram.png';
import Phone from './images/phone.png';
// Import Style
import styles from './Footer.css';

// Import Images

export function Footer() {
  return (
    <div className={styles.footer}>
      <img className={styles.face} src={Face} alt="Redes Sociales Facebook" />
      <img className={styles.google} src={Google} alt="Redes Sociales Google" />
      <img className={styles.twitter} src={Twitter} alt="Redes Sociales Twitter" />
      <img className={styles.insta} src={Instagram} alt="Redes Sociales Instagram" />
      <img className={styles.phone} src={Phone} alt="Redes Sociales Whatsapp" />
    </div>
  );
}

export default Footer;
