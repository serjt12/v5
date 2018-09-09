import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import styles from './payment.css';
import Cash from './images/efectivo.png';
import Credit from './images/credito.png';
import Countdown from 'react-countdown-now';
import { fetchTravel } from '../Travel/TravelActions';
import { getTravel } from '../Travel/TravelReducer';
import { addTravelToUserRequest, fetchCurrentUser } from '../Home/AuthActions';


class Payment extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        show: true,
      });
    }, 3000);
    this.props.dispatch(fetchTravel(this.props.params.cuid));
  }
  handleClick(travel) {
    this.props.router.push('/profile')
    this.props.dispatch(addTravelToUserRequest(travel));
  }

  render() {
    console.log(this.props)
    const travelid = (this.props.travel !== undefined) ? (this.props.travel._id) : {};
    const userid = (this.props.store.auth.currentUser !== undefined && this.props.store.auth.currentUser !== null) ? this.props.store.auth.currentUser._id : {};
    const data = { travelid, userid }
    const from = (this.props.travel !== undefined) ? (this.props.travel.from) : 'Desde';
    const to = (this.props.travel !== undefined) ? (this.props.travel.to) : 'Para';
    const date = (this.props.travel !== undefined) ? (this.props.travel.date) : Date.now();
    const price = (this.props.travel !== undefined) ? (this.props.travel.price) : '0000';
    const visible = `${styles.methodp} ${styles.visible}`
    return (
      <div className={styles['payment-container']}>
        <div className={styles.outerbox}>
          <span onClick={this.props.router.goBack} className={styles.closepayment}>X</span>
          <div className={styles.infobox}>
            <div className={styles.info}>
              <h5>VIAJE: {from.substring(0, 3).toUpperCase()}/{to.substring(0, 3).toUpperCase()} </h5>
              <p className={styles.fecha} >Hora: {moment(date).format('HH mm')}</p>
              <p className={styles.fecha} >Fecha: {moment(date).format('MMM Do YY')}</p>
              <h3 className={styles.pricepayment}>$ {price}</h3>
            </div>
          </div>
          <div className={styles.paymethodbox}>
            <h2>Método de pago</h2>
            {(!this.state.show) ?
              <div className={visible}>
                <div>
                  <img src={Cash} alt="Pago con Efectivo" />
                  <h5>Efectivo</h5>
                </div>
                <div className={styles.dotbox}>
                  <span className={styles.dotyellow}></span>
                  <span className={styles.dotgreen}></span>
                </div>
                <div>
                  <img src={Credit} alt="Pago con Credito" />
                  <h5>Tarjeta</h5>
                </div>
              </div> :
              <div className={styles.countdownbox}>
                <Countdown date={2.592e+9 + Date.now()} />
                <span className={styles.dias}>Solo por este mes GRATIS! TOBCITY</span>
                <button onClick={() => this.handleClick(data)} className={styles.continuar}>CONTINUAR</button>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

Payment.need = [params => {
  return fetchTravel(params.cuid);
}];

function mapStateToProps(store, props) {
  return {
    store,
    travel: getTravel(store, (props.params.cuid)),
  };
}


export default connect(mapStateToProps)(Payment);
