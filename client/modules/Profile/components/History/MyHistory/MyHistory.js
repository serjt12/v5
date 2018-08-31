import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styles from './myhistory.css';
import { Link } from 'react-router';


// Import Actions
import { fetchTravels } from '../../../../Travel/TravelActions';
import { getTravels } from '../../../../Travel/TravelReducer';
import moment from 'moment';

class MyHistory extends PureComponent {
  componentDidMount() {
    this.props.dispatch(fetchTravels());
  }

  renderTravels() {
    return (!this.props.travels.lenght !== 0) ? (this.props.travels.map)(travel => {
      return (
        <li className={styles.item} key={travel._id}>
          {
          (travel.author !== undefined && travel.author.id === this.props.userID)
          && <Link to={`/travels/${travel.cuid}`}>{travel.from}/{travel.to}/{moment(travel.date).format('MMM Do YY')}</Link>
          }
        </li>
      );
    }) : <li className={styles.item}><h2 className={styles.none} >Aun no haz postulado ningun viaje!!</h2></li>;
  }
  render() {
    console.log(this)
    return (
      <section>
        {(!this.props.showAddTravel) ?
          <div className={styles['myhistory-container']}>
            <ul>
              <li className={styles.item}>
                <h1 className={styles['myhistory-title']}>Viajes como Pasajero</h1>
              </li>
              {this.renderTravels()}
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
