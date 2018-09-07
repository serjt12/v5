import React, { PureComponent } from 'react';
import styles from './profilemain.css';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router';
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
    const userID = this.props.auth.currentUser._id;
    const name = (this.props.auth && this.props.auth.currentUser.name !== undefined) ? (this.props.auth.currentUser.name) : [];
    const { avatar, email, cellphone, city, credit, dateUpdated } = (this.props.auth.currentUser);
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
              <h2>{name}</h2>
              <div className={styles.box}><img src={MailIcon} alt="mail de registro para Tobcity" /> <span>{email} </span></div>
              <div className={styles.box}><img src={CellIcon} alt="cell de registro para Tobcity" /> <span>{cellphone}</span> </div>
              <div className={styles.box}><img src={CityIcon} alt="ciudad de registro para Tobcity" /> <span>{city}</span> </div>
              <div className={styles.box}><img src={MoneyIcon} alt="creditos para Tobcity" /> <span>{credit}</span> </div>
            </div>
            <div className={styles.citybox}>
              <img className={styles.city} src={Cityimg} alt="Tobcity Divide Tus gastos" />
            </div>
            <div className={styles.editbox}>
              <Link className={styles.edit} to={`/edit_form/${userID}`}>EDITAR PERFIL</Link>
              <small><em>ultima actualizacion hace {moment(dateUpdated).locale('es').fromNow(true)}</em></small>
            </div>
          </div> : null
      }
      </section>
    );
  }
}

function mapStateToProps(store) {
  return store;
}

export default connect(mapStateToProps)(ProfileMain);
