import React, { Component } from 'react';
import SearchInput, { createFilter } from 'react-search-input';
import styles from './nationalsearch.css';
import moment from 'moment';
import { Link } from 'react-router';
import Ticket from './images/ticket.png';
import Car from './images/carro.png';
import Mascotas from './images/options/mascotaazul.png';
import Equipaje from './images/options/equipajeazul.png';
import Cigarrillo from './images/options/cigarrilloazul.png';
import Comida from './images/options/comidaazul.png';

const KEYS_TO_FILTERS = ['from', 'to']

class NationalTravels extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
    };
    this.searchUpdated = this.searchUpdated.bind(this);
  }
  searchUpdated(term) {
    this.setState({ searchTerm: term });
  }
  render() {
    const { props: { national } } = this;
    const filteredNacional = national.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
    return (
      <div>
        <div className={styles.ticket_container}>
          <SearchInput placeholder="Donde quieres ir?" className={styles['search-input']} onChange={this.searchUpdated} />
          <h1>VIAJES NACIONALES</h1>
          {filteredNacional.map((travel) => (
            <div key={travel._id} className={styles['tickets-inside']}>
              <img className={styles.ticket} src={Ticket} alt="Viaja con Tobcity" />
              <h4 className={styles.price}>$ {travel.price}</h4>
              <h5>DRIVER: <br /> {travel.author.name}</h5>
              <p className={styles.cities}>{travel.from.substring(0, 3).toUpperCase()}/{travel.to.substring(0, 3).toUpperCase()}</p>
              <div className={styles['options-container']}>
                <p className={styles.preferencias}>PREFERENCIAS</p>
                <img className={styles.optionsimg} onClick={this.handleOnClick} alt="Opciones de viaje" src={Mascotas} />
                <img className={styles.optionsimg} onClick={this.handleOnClick} alt="Opciones de viaje" src={Equipaje} />
                <img className={styles.optionsimg} onClick={this.handleOnClick} alt="Opciones de viaje" src={Cigarrillo} />
                <img className={styles.optionsimg} onClick={this.handleOnClick} alt="Opciones de viaje" src={Comida} />
              </div>
              <div className={styles.info}>
                <p className={styles.fecha} >Hora: {moment(travel.date).format('HH mm')}</p>
                <p className={styles.fecha} >Fecha: {moment(travel.date).format('MMM Do YY')}</p>
                <p className={styles.cupos} >Puestos: {travel.sits}/4</p>
              </div>
              <Link to={`/travels/${travel.cuid}`} >
                <img className={styles.car} src={Car} alt="Viaja con Tobcity" />
              </Link>
            </div>))
          }
        </div>
      </div>
  ); }
}

export default NationalTravels;
