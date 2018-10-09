import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './myhistory.css';
import MyTravels from './MyTravels';
import MyPassenger from './MyPassenger';
import ToggleButton from 'react-toggle-button';

// Import Actions
import { fetchTravels } from '../../../../Travel/TravelActions';
import { getTravels } from '../../../../Travel/TravelReducer';

class MyHistory extends Component {
  state = ({
    value: false,
  })
  componentDidMount() {
    this.props.dispatch(fetchTravels());
  }
  render() {
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
                active: {
                  base: 'rgb(249,249,249)',
                },
                inactive: {
                  base: 'rgb(249,249,249)',
                },
              }}
              value={this.state.value || false}
              onToggle={(value) => {
                this.setState({
                  value: !value,
                });
              }}
            />
          </div>
          <p>TOBDRIVER</p>
        </div>
        {(!this.props.showAddTravel) ?
          <div className={styles['myhistory-container']}>
            <ul>
              {(this.state.value) ?
                <MyTravels userID={this.props.userID} travels={this.props.travels} /> :
                <MyPassenger />
              }
            </ul>
          </div> : null}
      </section>
    );
  }
}
MyHistory.propTypes = {
  dispatch: PropTypes.func,
  userID: PropTypes.string,
  travels: PropTypes.array,
  showAddTravel: PropTypes.bool,
};

function mapStateToProps(store) {
  return {
    userID: store.auth.currentUser._id,
    travels: getTravels(store),
    showAddTravel: store.app.showAddTravel,
  };
}

export default connect(mapStateToProps)(MyHistory);
