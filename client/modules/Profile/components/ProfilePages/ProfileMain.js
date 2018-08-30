import React, { PureComponent } from 'react';
import styles from './profilemain.css';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import Sky from './images/superior.png';
import Circulo from './images/circulo-perfil.png';
import Logo from './images/logo.png';
import MailIcon from './images/mail.png';
import CellIcon from './images/phone.png';
import CityIcon from './images/location.png';
import MoneyIcon from './images/money.png';
import Cityimg from './images/ciudad.png';
import TravelCreateWidget from '../../../Travel/components/TravelCreateWidget/TravelCreateWidget';
import { addTravelRequest } from '../../../Travel/TravelActions';
import { toggleAddTravel } from '../../../App/AppActions';

class ProfileMain extends PureComponent {
  handleAddTravel = (name, title, content) => {
    this.props.dispatch(toggleAddTravel());
    this.props.dispatch(addTravelRequest({ name, title, content }));
  };
  render() {
    const { avatar, name, email, cellphone, city, credit } = (this.props.auth.currentUser);
    return (
      <section className={styles['profile-container']}>
        <TravelCreateWidget addTravel={this.handleAddTravel} showAddTravel={this.props.app.showAddTravel} />
        <div className={styles.skyprofile}>
          <img className={styles.sky} src={Sky} alt="Tobcity Divide Tus gastos" />
          <div className={styles.profiletop}>
            <img className={styles.circulo} src={Circulo} alt="Tobcity Divide Tus gastos" />
            <img className={styles.avatar} src={avatar} alt="Tobcity Divide Tus gastos" />
            <a className={styles.logout} href="api/logout"><FormattedMessage id="logout" /></a>
          </div>
          <img className={styles.logo} src={Logo} alt="Tobcity Divide Tus gastos" />
        </div>
        {(!this.props.app.showAddTravel) ?
          <div className={styles['profile-data']}>
            <h4>HOLA! {name.toUpperCase()}</h4>
            <div className={styles.box}><img src={MailIcon} alt="mail de registro para Tobcity" /> <em>{email}</em> </div>
            <div className={styles.box}><img src={CellIcon} alt="cell de registro para Tobcity" /> <em>{cellphone}</em> </div>
            <div className={styles.box}><img src={CityIcon} alt="ciudad de registro para Tobcity" /> <em>{city}</em> </div>
            <div className={styles.box}><img src={MoneyIcon} alt="creditos para Tobcity" /> <em>{credit}</em> </div>
          </div> : null
        }

        <div className={styles.citybox}>
          <img className={styles.city} src={Cityimg} alt="Tobcity Divide Tus gastos" />
        </div>
      </section>
    );
  }
}

function mapStateToProps(store) {
  // console.log(store)
  return store;
}

export default connect(mapStateToProps)(ProfileMain);
