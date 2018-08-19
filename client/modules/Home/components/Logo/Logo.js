import React, { PureComponent } from 'react';

// Import Style
import styles from './Logo.css';

import LogoImg from './images/logo.png';

class Logo extends PureComponent {

  render() {
    return (
      <div className={styles['top-container']}>
        <div className={styles.circulo}>
          <div className={styles.emojis}>
            <img className={styles.logo} src={LogoImg} alt="TOBCITY logo" />
          </div>
        </div>
      </div>
    );
  }

}

export default Logo;
