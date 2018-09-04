import React, { PureComponent } from 'react';
import styles from './TravelForm.css';
import Mascotas from './images/mascotaazul.png';
import Equipaje from './images/equipajeazul.png';
import Cigarrillo from './images/cigarrilloazul.png';
import Comida from './images/comidaazul.png';

class Options extends PureComponent {
  handleOnClick = () => {
    console.log();
  }
  render() {
    const images = [Mascotas, Equipaje, Cigarrillo, Comida];
    return (
      <div className={styles.options}>
        <img onClick={this.handleOnClick} alt="Opciones de viaje" src={Mascotas} />
        <img onClick={this.handleOnClick} alt="Opciones de viaje" src={Equipaje} />
        <img onClick={this.handleOnClick} alt="Opciones de viaje" src={Cigarrillo} />
        <img onClick={this.handleOnClick} alt="Opciones de viaje" src={Comida} />
      </div>
    );
  }

}

export default Options;
