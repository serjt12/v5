import React, { PureComponent } from 'react';
import Paso1 from './images/paso1num.png';
import Paso2 from './images/paso2num.png';
import Paso3 from './images/paso3num.png';
import Paso4 from './images/paso4num.png';

// Import Style
import styles from './appinfo.css';

class Logo extends PureComponent {

  render() {
    return (
      <div className={styles['info-container']}>
        <div className={styles.dotbox}>
          <span className={styles.dotyellow}></span>
          <span className={styles.dotgreen}></span>
        </div>
        <div className={styles['steps-container']}>
          <div className={styles.step1}>
            <img src={Paso1} alt="paso 1" className={styles.paso1img} />
            <div className={styles.text1}>
              <h3>REGISTRO</h3>
              <p>Puedes registrarte con tu cuenta de Facebook o Google</p>
            </div>
          </div>
          <div className={styles.step2}>
            <img src={Paso2} alt="paso 2" className={styles.paso2img} />
            <div className={styles.text2}>
              <h3>EDITA TU PERFIL</h3>
              <p>Postea tus viajes y lleva un historial sobre ellos</p>
            </div>
          </div>
          <div className={styles.step3}>
            <img src={Paso3} alt="paso 3" className={styles.paso3img} />
            <div className={styles.text3}>
              <h4>BUSCA TU VIAJE</h4>
              <p>Ahora estas listo para elegir tu destino y tu compañia</p>
            </div>
          </div>
          <div className={styles.step4}>
            <img src={Paso4} alt="paso 4" className={styles.paso4img} />
            <div className={styles.text4}>
              <h4>CALIFICA</h4>
              <p>No olvides calificar tu conductor, asi podemos brindarte un mejor servicio </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default Logo;
