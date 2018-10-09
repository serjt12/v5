import React, { PureComponent } from 'react';
import styles from './Road.css';
import Roadimg from './images/road.jpg';
import Paso1 from './images/desk/paso1num.png';
import Registroimg from './images/desk/registroimg.png';
import Paso2 from './images/desk/paso2num.png';
import Editimg from './images/desk/edit.png';
import Paso3 from './images/desk/paso3num.png';
import Buscarimg from './images/desk/buscar.png';
import Paso4 from './images/desk/paso4num.png';
import Calificarimg from './images/desk/calificar.png';

class Road extends PureComponent {
  render() {
    return (
      <div className={styles['road-container']}>
        <img className={styles.roadimg} src={Roadimg} alt="Road Tobcity" />
        <div className={styles.step1}>
          <div className={styles.text1}>
            <h4>REGISTRO</h4>
            <p>Puedes registrarte con tu cuenta de Facebook o Google</p>
            <img src={Registroimg} alt="Registrarse paso 1 Tobcity" className={styles.registroimg} />
          </div>
          <img src={Paso1} alt="paso 1" className={styles.paso1img} />
        </div>
        <div className={styles.step2}>
          <img src={Paso2} alt="paso 2" className={styles.paso2img} />
          <div className={styles.text2}>
            <h4>EDITA TU PERFIL</h4>
            <p>Postea tus viajes y lleva un historial sobre ellos</p>
            <img src={Editimg} alt="Editar perfil paso 2 Tobcity" className={styles.editimg} />
          </div>
        </div>
        <div className={styles.step3}>
          <img src={Paso3} alt="paso 3" className={styles.paso3img} />
          <div className={styles.text3}>
            <h4>BUSCA TU VIAJE</h4>
            <p>Ahora estas listo para elegir tu destino y tu compañia</p>
            <img src={Buscarimg} alt="Buscar viaje paso 2 Tobcity" className={styles.buscarimg} />
          </div>
        </div>
        <div className={styles.step4}>
          <img src={Paso4} alt="paso 4" className={styles.paso4img} />
          <div className={styles.text4}>
            <h4>CALIFICA</h4>
            <p>No olvides calificar tu conductor, asi podemos brindarte un mejor servicio </p>
            <img src={Calificarimg} alt="Editar perfil paso 2 Tobcity" className={styles.calificarimg} />
          </div>
        </div>
      </div>
    );
  }

}

export default Road;
