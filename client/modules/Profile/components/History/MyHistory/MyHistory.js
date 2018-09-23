import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './myhistory.css';
import MyTravels from './MyTravels';
import MyPassenger from './MyPassenger';
import ToggleButton from 'react-toggle-button';

// Import Actions
import { fetchTravels, deleteTravelRequest } from '../../../../Travel/TravelActions';
import { getTravels } from '../../../../Travel/TravelReducer';

class MyHistory extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      ToggleHistory: true,
    });
  }
  componentDidMount() {
    this.props.dispatch(fetchTravels());
  }
  handleDeleteTravel = travel => {
    if (confirm('Do you want to delete this post')) { // eslint-disable-line
      this.props.dispatch(deleteTravelRequest(travel));
    }
  };
  render() {
    const { state: { ToggleHistory } } = this;
    return (
      <section>
        <div className={styles.togglebox}>
          <p>TOBPASSENGER</p>
          <div className={styles.toggleinside}>
            <ToggleButton
              inactiveLabel={''}
              activeLabel={''}
              colors={{
                activeThumb: {
                  base: 'rgb(255,230,8)',
                },
                inactiveThumb: {
                  base: 'rgb(255,230,8)',
                },
              }}
              value={this.state.value || false}
              onToggle={(value) => {
                this.setState({
                  value: !value,
                })
              }}
            />
          </div>
          <p>TOBDRIVER</p>
        </div>
        {(!this.props.showAddTravel) ?
          <div className={styles['myhistory-container']}>
            <ul>
              {(this.state.value) ?
                <MyTravels showAddTravel={this.props.showAddPost} handleDeleteTravel={this.handleDeleteTravel} userID={this.props.userID} travels={this.props.travels} /> :
                <MyPassenger handleDeleteTravel={this.handleDeleteTravel} />
              }
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
