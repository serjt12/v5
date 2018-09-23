import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Loading from 'react-loading-components';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import TravelCreateWidget from '../../../Travel/components/TravelCreateWidget/TravelCreateWidget';
import Circulo from './images/circulo.png';
import Sky from './images/sky.png';
import Mascotas from './images/options/mascotaazul.png';
import Equipaje from './images/options/equipajeazul.png';
import Cigarrillo from './images/options/cigarrilloazul.png';
import Comida from './images/options/comidaazul.png';
import Car from './images/carro.png';
import Barra from './images/barra.png';

// Import Style
import styles from './TravelDetailPage.css';

// Import Actions
import { fetchTravel } from '../../TravelActions';
import { getTravel } from '../../TravelReducer';

class TravelDetailPage extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (this.props.travel.passengers !== nextProps.travel.passenger)
  }
  render() {
    const avatar = ((this.props.user !== null) ? (this.props.user.avatar) : ('https://via.placeholder.com/350x150'));
    const confirmed = ((this.props.user !== null) && (this.props.user.confirmed));
    const firstName = (this.props.user !== null) && this.props.user.name.split(' ')[0];
    const userID = (this.props.user !== null) ? this.props.user._id : '';
    const passengersList = (this.props.travel !== null) && this.props.travel.passenger;
    const cuid = (this.props.travel !== null) && this.props.travel.cuid;
    const Pasajeros = passengersList.map((pass) => {
      return (
        <li key={pass._id} className={styles.item}>
          <img className={styles.passengerimg} src={pass.avatar} alt={`Tobpassenger ${pass.name}`} />{pass.name}
        </li>
     );
    });
    const author = (userID === this.props.travel.author._id);
    const tobpassenger = passengersList.filter((user) => user._id === userID)
    // console.log('PROPS', this.props)
    // console.log('Passenger list', passengersList)
    // console.log('USER', userID)
    // console.log('TOBPASSENGERS', tobpassenger)
    // console.log('Author', author)
    return (
      <div>
        <Helmet title={`Viaje hacia ${this.props.travel.to}`} />
        <section className={styles['detail-container']}>
          <TravelCreateWidget showAddTravel={this.props.showAddTravel} />
          {(this.props.user !== null) ?
            <div className={styles.detailtop}>
              <div>
                <img className={styles.sky} src={Sky} alt="Tobcity Divide Tus gastos" />
                <img className={styles.circulo} src={Circulo} alt="Tobcity Divide Tus gastos" />
                <Link to="/profile"><img className={styles.avatar} src={avatar} alt="Tobcity Divide Tus gastos" /></Link>
              </div>
              <h2>HOLA! {firstName.toUpperCase()}</h2>
            </div> : <Loading type="oval" width={200} height={200} fill="#00BFB5" />
          }
          {(this.props.travel !== null) ?
            <div className={styles['travel-detail']}>
              <img className={styles.barra} alt="Opciones de viaje" src={Barra} />
              <p className={styles.cities}>{this.props.travel.from}/{this.props.travel.to}</p>
              <h3 className={styles.price}>$ {this.props.travel.price}</h3>
              <h2>DRIVER: <br /> {this.props.travel.author.name}</h2>
              <div className={styles.comments}>
                <h4>Comentarios del TOBDRIVER: </h4>
                <p>{this.props.travel.content}</p>
              </div>
              <div className={styles['users-container']}>
                <ul className={styles.passengers}>
                  <li>Usuarios programados para este viaje:</li>
                  {Pasajeros}
                </ul>
              </div>
              <div className={styles.info}>
                <p className={styles.fecha} >Hora: {moment(this.props.travel.date).format('HH mm')}</p>
                <p className={styles.fecha} >Fecha: {moment(this.props.travel.date).format('MMM Do YY')}</p>
                <p className={styles.cupos} >Puestos: {this.props.travel.sits}/4</p>
              </div>
              <img className={styles.car} src={Car} alt="Viaja con Tobcity" />
              <div className={styles.actionsbtns}>
              {
                (tobpassenger.length === 0 && !author && confirmed) ?
                  <Link to={`/payment/${cuid}`} ><button className={styles.viajar}>VIAJAR</button></Link>
                : null
              }
                <button onClick={this.props.router.goBack} className={styles.cancelar}>CERRAR</button>
              </div>
            </div> : <Loading type="oval" width={200} height={200} fill="#00BFB5" />
          }
        </section>
      </div>
    );
  }
}

// Actions required to provide data for this component to render in server side.
TravelDetailPage.need = [params => {
  return fetchTravel(params.cuid);
}];

// Retrieve data from store as this.props
function mapStateToProps(store, props) {
  // console.log('TRAVELS PASSENGERS', store.travel)
  return {
    showAddTravel: store.app.showAddTravel,
    user: store.auth.currentUser,
    travel: getTravel(store, props.params.cuid),
  };
}

TravelDetailPage.propTypes = {

};

export default connect(mapStateToProps)(TravelDetailPage);
