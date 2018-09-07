import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './myhistory.css';
import MyTravels from './MyTravels';

// Import Actions
import { fetchTravels, deleteTravelRequest } from '../../../../Travel/TravelActions';
import { getTravels } from '../../../../Travel/TravelReducer';

class MyHistory extends Component {
  componentDidMount() {
    this.props.dispatch(fetchTravels());
  }
  handleDeleteTravel = travel => {
    if (confirm('Do you want to delete this post')) { // eslint-disable-line
      this.props.dispatch(deleteTravelRequest(travel));
    }
  };
  render() {
    return (
      <section>
        {(!this.props.showAddTravel) ?
          <div className={styles['myhistory-container']}>
            <ul>
              <li className={styles.item}>
                <h1 className={styles['myhistory-title']}>Viajes Postulados</h1>
              </li>
              <MyTravels showAddTravel={this.props.showAddPost} handleDeleteTravel={this.handleDeleteTravel} userID={this.props.userID} travels={this.props.travels} />
            </ul>
          </div> : null}
      </section>
    );
  }
}

function mapStateToProps(store) {
  return {
    userID: store.auth.currentUser._id,
    travels: getTravels(store),
    showAddTravel: store.app.showAddTravel,
  };
}

export default connect(mapStateToProps)(MyHistory);
