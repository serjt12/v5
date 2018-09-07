import React from 'react';
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

export function TravelDetailPage(props) {
  const avatar = ((props.user !== null) ? (props.user.avatar) : ('https://via.placeholder.com/350x150'));
  const firstName = (props.user !== null) && props.user.name.split(' ')[0];
  const travelID = (props.travel !== null) && props.travel._id;
  const cuid = (props.travel !== null) && props.travel.cuid;
  return (
    <div>
      <Helmet title={`Viaje hacia ${props.travel.to}`} />
      <section className={styles.national_container}>
        <TravelCreateWidget showAddTravel={props.showAddTravel} />
        {(props.user !== null) ?
          <div className={styles.detailtop}>
            <div>
              <img className={styles.sky} src={Sky} alt="Tobcity Divide Tus gastos" />
              <img className={styles.circulo} src={Circulo} alt="Tobcity Divide Tus gastos" />
              <Link to="/profile"><img className={styles.avatar} src={avatar} alt="Tobcity Divide Tus gastos" /></Link>
            </div>
            <h2>HOLA! {firstName.toUpperCase()}</h2>
          </div> : <Loading type="oval" width={200} height={200} fill="#00BFB5" />
        }
        {(props.travel !== null) ?
          <div className={styles['travel-detail']}>
            <img className={styles.barra} alt="Opciones de viaje" src={Barra} />
            <p className={styles.cities}>{props.travel.from.substring(0, 3).toUpperCase()}/{props.travel.to.substring(0, 3).toUpperCase()}</p>
            <h3 className={styles.price}>$ {props.travel.price}</h3>
            <h2>DRIVER: <br /> {props.travel.author.name}</h2>
            <div className={styles.comments}>
              <h4>Comentarios del TOBDRIVER: </h4>
              <p>{props.travel.content}</p>
            </div>
            <div className={styles['options-container']}>
              <img className={styles.optionsimg} alt="Opciones de viaje" src={Mascotas} />
              <img className={styles.optionsimg} alt="Opciones de viaje" src={Equipaje} />
              <img className={styles.optionsimg} alt="Opciones de viaje" src={Cigarrillo} />
              <img className={styles.optionsimg} alt="Opciones de viaje" src={Comida} />
            </div>
            <div className={styles.info}>
              <p className={styles.fecha} >Hora: {moment(props.travel.date).format('HH mm')}</p>
              <p className={styles.fecha} >Fecha: {moment(props.travel.date).format('MMM Do YY')}</p>
              <p className={styles.cupos} >Puestos: {props.travel.sits}/4</p>
            </div>
            <img className={styles.car} src={Car} alt="Viaja con Tobcity" />
            <div className={styles.actionsbtns}>
            {
              (props.user !== undefined && props.user !== null && props.user &&  props.user.name === props.travel.author.name) ?
                null
              : <Link to={`/payment/${cuid}`} ><button className={styles.viajar}>VIAJAR</button></Link>
            }
              <button onClick={props.router.goBack} className={styles.cancelar}>CERRAR</button>
            </div>
          </div> : <Loading type="oval" width={200} height={200} fill="#00BFB5" />
        }
      </section>
    </div>
  );
}

// Actions required to provide data for this component to render in server side.
TravelDetailPage.need = [params => {
  return fetchTravel(params.cuid);
}];

// Retrieve data from store as props
function mapStateToProps(store, props) {
  return {
    showAddTravel: store.app.showAddTravel,
    user: store.auth.currentUser,
    travel: getTravel(store, props.params.cuid),
  };
}

TravelDetailPage.propTypes = {

};

export default connect(mapStateToProps)(TravelDetailPage);
