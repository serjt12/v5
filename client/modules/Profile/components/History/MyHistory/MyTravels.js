import React, { Component } from 'react';
import styles from './myhistory.css';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { fetchTravels } from '../../../../Travel/TravelActions';
import { getTravels } from '../../../../Travel/TravelReducer';

class MyTravels extends Component {
  componentDidMount() {
    this.props.dispatch(fetchTravels());
  }
  render() {
    // console.log('my travels props', this.props)
    const mytravels = this.props.travels.filter(travel => (travel.author._id === this.props.userID));
    return (
      <div>
        <li className={styles.item}>
          <h1 className={styles['myhistory-title']}>Viajes Postulados</h1>
        </li>
      {(mytravels.length !== 0 && mytravels !== null) ?
        mytravels.map((travel) => {
          return (
            <li key={travel._id} className={styles.item}> <Link to={`/travels/${travel.cuid}`}>{travel.from}/{travel.to}/{moment(travel.date).format('MMM Do YY')}</Link>
              <span className={styles.deletebtn} >X</span>
            </li>
          );
        }) : <li key="none" className={styles.item}><h2 className={styles.none}>Aun no postulas ningun viaje, hazlo ahora</h2></li>
    }
      </div>
   );
  }
}
MyTravels.propTypes = {
  dispatch: PropTypes.fun,
  travels: PropTypes.object,
  userID: PropTypes.string,
};
function mapStateToProps(store) {
  return {
    userID: store.auth.currentUser._id,
    travels: getTravels(store),
  };
}

export default connect(mapStateToProps)(MyTravels);
