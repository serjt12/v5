import React, { Component } from 'react';
import styles from './myhistory.css';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment';
import { fetchTravels } from '../../../../Travel/TravelActions';
import { getTravels } from '../../../../Travel/TravelReducer';

class MyTravels extends Component {
  componentDidMount() {
    this.props.dispatch(fetchTravels());
  }
  render(){
    const mytravels = this.props.travels.filter(travel => (travel.author._id === this.props.userID))
    console.log(this)
    return (
      <div>
      {(mytravels.length !== 0 && mytravels !== null) ?
        mytravels.map((travel) => {
          return (
            <li key={travel._id} className={styles.item}> <Link to={`/travels/${travel.cuid}`}>{travel.from}/{travel.to}/{moment(travel.date).format('MMM Do YY')}</Link>
              <span className={styles.deletebtn} onClick={() => handleDeleteTravel(travel.cuid)}>X</span>
            </li>
          );
        }) : <li key="none" className={styles.item}><h2 className={styles.none}>Aun no postulas ningun viaje, hazlo ahora</h2></li>
    }
      </div>
   );
 }
}

function mapStateToProps(store) {
  return {
    userID: store.auth.currentUser._id,
    travels: getTravels(store),
  };
}

export default connect(mapStateToProps)(MyTravels);
