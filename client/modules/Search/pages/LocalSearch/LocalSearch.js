import React, { PureComponent } from 'react';
import Loading from 'react-loading-components';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Search from '../../Search';
import TopDrivers from '../../TopDriver/TopDriver';
import { fetchTravels } from '../../../Travel/TravelActions';
import LocalTravels from './LocalTravels';
import styles from './localsearch.css';
import Circulo from './images/circulo.png';
import Sky from './images/sky.png';
import Logo from './images/logo.png';

class LocalSearch extends PureComponent {
  componentDidMount() {
    this.props.dispatch(fetchTravels());
  }
  render() {
    const localtravels = (this.props.travels !== undefined) ? this.props.travels.filter((localTravel) => (localTravel.traveltype === 'local')) : [];
    const avatar = ((this.props.user.currentUser !== null) ? (this.props.user.currentUser.avatar) : ('https://via.placeholder.com/350x150'));
    const firstName = ((this.props.user.currentUser !== null) && (this.props.user.currentUser.name.split(' ')[0]));
    return (
      <section className={styles['local-container']}>
        {(this.props.user.currentUser !== null) ?
          <div className={styles.localsearchtop}>
            <div>
              <img className={styles.sky} src={Sky} alt="Tobcity Divide Tus gastos" />
              <img className={styles.circulo} src={Circulo} alt="Tobcity Divide Tus gastos" />
              <Link to="/profile"><img className={styles.avatar} src={avatar} alt="Tobcity Divide Tus gastos" /></Link>
            </div>
            <h2>HOLA! <br /> {firstName.toUpperCase()}</h2>
          </div> : <Loading type="oval" width={200} height={200} fill="rgb(42,168,154)" />
        }
        <TopDrivers travels={this.props.travels} />
        <LocalTravels local={localtravels} />
        <img className={styles.logo} src={Logo} alt="Tobcity Divide Tus gastos" />
        <Search zone="local" />
      </section>
    );
  }
}

function mapStateToProps({ app, auth, travel }) {
  return {
    user: auth,
    travels: travel.data,
    showAddTravel: app.showAddTravel,
  };
}

export default connect(mapStateToProps)(LocalSearch);
