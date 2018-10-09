import React, { PureComponent } from 'react';
import Carousel from './Carousel';
import LogoImg from './images/logo.png';
import CirculoEmojis from './images/circuloemoji.png';

// Import Style
import styles from './Logo.css';

class Logo extends PureComponent {
  state =({
    showCarousel: false,
  })

  componentDidMount() {
    setTimeout(() => {
      this.setState({ showCarousel: true });
    }, 2000);// eslint-disable-line
  }

  render() {
    return (
      <div className={styles['top-container']}>
        <div className={styles.circulo}>
          <img className={styles.emojis} src={CirculoEmojis}alt="Circulo emojis TOBCITY" />
          <div className={styles['carousel-container']}>
          {(this.state.showCarousel) ?
            <Carousel /> :
            <img className={styles.logo} src={LogoImg} alt="TOBCITY Logo" />
          }
          </div>
        </div>
      </div>
    );
  }

}

export default Logo;
