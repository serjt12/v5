import React, { PureComponent } from 'react';
import styles from './profilemain.css';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Sky from './images/superior.png';
import Circulo from './images/circulo-perfil.png';
import Logo from './images/logo.png';
import MailIcon from './images/mail.png';
import CellIcon from './images/phone.png';
import CityIcon from './images/location.png';
import MoneyIcon from './images/money.png';
import Cityimg from './images/ciudad.png';
import TravelCreateWidget from '../../../Travel/components/TravelCreateWidget/TravelCreateWidget';

class ProfileMain extends PureComponent {

  render() {
    const { avatar, name, email, cellphone, city, credit } = (this.props.auth.currentUser);
    return (
      <section className={styles['profile-container']}>
        <Helmet title={`TOBCITY - ${this.props.auth.currentUser.name}`} />
        <TravelCreateWidget showAddTravel={this.props.app.showAddTravel} />
        {(!this.props.app.showAddTravel) ?
          <div>
            <div className={styles.skyprofile}>
              <img className={styles.sky} src={Sky} alt="Tobcity Divide Tus gastos" />
              <div className={styles.profiletop}>
                <img className={styles.circulo} src={Circulo} alt="Tobcity Divide Tus gastos" />
                <img className={styles.avatar} src={avatar} alt="Tobcity Divide Tus gastos" />
              </div>
              <img className={styles.logo} src={Logo} alt="Tobcity Divide Tus gastos" />
            </div>
            <div className={styles['profile-data']}>
              <h2>{name.toUpperCase()}</h2>
              <div className={styles.box}><img src={MailIcon} alt="mail de registro para Tobcity" /> <span>{email} </span></div>
              <div className={styles.box}><img src={CellIcon} alt="cell de registro para Tobcity" /> <span>{cellphone}</span> </div>
              <div className={styles.box}><img src={CityIcon} alt="ciudad de registro para Tobcity" /> <span>{city}</span> </div>
              <div className={styles.box}><img src={MoneyIcon} alt="creditos para Tobcity" /> <span>{credit}</span> </div>
            </div>
            <div className={styles.citybox}>
              <img className={styles.city} src={Cityimg} alt="Tobcity Divide Tus gastos" />
            </div>
          </div> : null
      }
      </section>
    );
  }
}

function mapStateToProps(store) {
  // console.log(store)
  return store;
}

export default connect(mapStateToProps)(ProfileMain);
