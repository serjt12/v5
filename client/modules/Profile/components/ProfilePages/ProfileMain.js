import React, { PureComponent } from 'react';
import styles from './profilemain.css';
import { connect } from 'react-redux';
import StarRatingComponent from 'react-star-rating-component';
import moment from 'moment';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import Sky from './images/superior.png';
import CirculoMob from './images/circulo-perfilmob.png';
import CirculoDesk from './images/circulo-perfildesk.png';
import Logo from './images/logo.png';
import Edit from './images/editar-perfil.png';
import MailIcon from './images/mail.png';
import CellIcon from './images/phone.png';
import CityIcon from './images/location.png';
import MoneyIcon from './images/money.png';
import Cityimgmob from './images/ciudadmob.png';
import Cityimgdesk from './images/ciudaddesk.png';
import TravelCreateWidget from '../../../Travel/components/TravelCreateWidget/TravelCreateWidget';

class ProfileMain extends PureComponent {
  state =({
    tooltip: false,
  })
  handleOnHover = () => {
    this.setState({
      tooltip: true,
    });
  }
  handleOnLeave = () => {
    this.setState({
      tooltip: !this.state.tooltip,
    });
  }
  render() {
    const userID = (this.props !== null && this.props.auth !== null && this.props.auth.currentUser !== null) ? this.props.auth.currentUser._id : null;
    const name = (this.props.auth.currentUser !== null && this.props.auth && this.props.auth.currentUser.name !== undefined) ? (this.props.auth.currentUser.name) : [];
    const { avatar, email, cellphone, city, credit, dateUpdated, dateCreated, confirmed, rateValue, rateCount } = (this.props.auth.currentUser !== null ?
    this.props.auth.currentUser : null);
    const avg = rateValue / rateCount;
    return (
      <section className={styles['profile-container']}>
        <Helmet title={`TOBCITY - ${this.props.auth.currentUser.name}`} />
        <TravelCreateWidget showAddTravel={this.props.app.showAddTravel} />
        {(!this.props.app.showAddTravel) ?
          <div className={styles.profilewrap}>
            <div className={styles.skyprofile}>
              <img className={styles.sky} src={Sky} alt="Tobcity Divide Tus gastos" />
              <div className={styles.profiletop}>
                <img className={styles.circulomob} src={CirculoMob} alt="Tobcity Divide Tus gastos" />
                <img className={styles.circulodesk} src={CirculoDesk} alt="Tobcity Divide Tus gastos" />
                <img className={styles.avatar} src={avatar} alt="Tobcity Divide Tus gastos" />
              </div>
              <img className={styles.logo} src={Logo} alt="Tobcity Divide Tus gastos" />
            </div>
            <div className={styles['profile-data']}>
              <h2>{name}</h2>
              <div className={styles.box}>
                <img src={MailIcon} alt="mail de registro para Tobcity" />
                <span>{email}</span>
              </div>
              <div className={styles.box}>
                <img src={CellIcon} alt="cell de registro para Tobcity" />
                {confirmed ?
                  <div className={styles.check}>
                    <span>{cellphone}</span>
                    <i className="fas fa-check-circle" onMouseEnter={this.handleOnHover} onMouseLeave={this.handleOnLeave} />
                    <p className={(this.state.tooltip) ? styles.tooltip : styles.hide} >Mail Confirmado!</p>
                  </div>
                  :
                  <div className={styles.nocheck}>
                    Confirma tu numero celular <Link to={`/edit_form/${userID}`}><span className={styles.aqui}>aqui</span></Link>
                    <i className="fas fa-exclamation-circle" onMouseEnter={this.handleOnHover} onMouseLeave={this.handleOnLeave} />
                  </div>
                }
              </div>
              <div className={styles.box}><img src={CityIcon} alt="ciudad de registro para Tobcity" /> <span>{city}</span> </div>
              <div className={styles.box}><img src={MoneyIcon} alt="creditos para Tobcity" /> <span>{credit}</span> </div>
              <div className={styles.ratingbox}>
                <p className={styles.ratingstars}>PUNTAJE</p>
                <StarRatingComponent
                  className={styles.stars}
                  name={'Puntaje de ${name}'}
                  editing={false}
                  starColor="#fff"
                  emptyStarColor="#fff"
                  value={avg}
                  renderStarIcon={(index, value) => {
                    return (
                      <span>
                        <i className={index <= value ? 'fas fa-star' : 'far fa-star'} />
                      </span>
                    );
                  }}
                  renderStarIconHalf={() => {
                    return (
                      <span>
                        <span style={{ position: 'absolute' }}><i className="far fa-star" /></span>
                        <span><i className="fas fa-star-half" /></span>
                      </span>
                    );
                  }}
                />
              </div>
            </div>
            <div className={styles.cityboxmob}>
              <img className={styles.citymob} src={Cityimgmob} alt="Tobcity Divide Tus gastos" />
            </div>
            <div className={styles.cityboxdesk}>
              <img className={styles.citydesk} src={Cityimgdesk} alt="Tobcity Divide Tus gastos" />
            </div>
            <div className={styles.editbox}>
              <Link className={styles.edit} to={`/edit_form/${userID}`}><img src={Edit} alt="Edita tu perfil" /></Link>
              <small><em>ultima actualización hace {moment(dateUpdated !== undefined ? dateUpdated : dateCreated).locale('es').fromNow(true)}</em></small>
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
