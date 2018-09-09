import React, { Component } from 'react';
import styles from './myhistory.css';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment';
import { fetchTravels } from '../../../../Travel/TravelActions';
import { getTravels } from '../../../../Travel/TravelReducer';

class MyPassenger extends Component {
  componentDidMount() {
    this.props.dispatch(fetchTravels());
  }
  render(){
    // console.log('My passenger props', this.props)
    // const myPassengerTravels = this.props.myPassenger
    return (
   //    <div>
   //      <li className={styles.item}>
   //        <h1 className={styles['myhistory-title']}>MY PASSENGER TRAVELS</h1>
   //      </li>
   //    {(myPassengerTravels.length !== 0 && myPassengerTravels !== null) ?
   //      myPassengerTravels.map((travel) => {
   //        console.log(travel)
   //        return (
   //          <li key={travel._id} className={styles.item}> <Link to={`/travels/${travel.cuid}`}>{travel.from}/{travel.to}/{moment(travel.date).format('MMM Do YY')}</Link>
   //            <span className={styles.deletebtn} onClick={() => this.props.handleDeleteTravel(travel.cuid)}>X</span>
   //          </li>
   //        );
   //      }) : <li key="none" className={styles.item}><h2 className={styles.none}>Aun no programas ningun viaje, hazlo ahora</h2></li>
   //  }
   //    </div>
   // );
      <p>PASSENGER!!!</p>
    ); }
}

function mapStateToProps(store) {
  console.log(store)
  return {
    myPassenger: store.auth.currentUser.travels,
    userID: store.auth.currentUser._id,
    travels: getTravels(store),
  };
}

export default connect(mapStateToProps)(MyPassenger);
