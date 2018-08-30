import React, { PureComponent } from 'react';
import styles from './history.css';
import MyHistory from './MyHistory/MyHistory';

class Profile extends PureComponent {
  render() {
    return (
      <div className={styles['history-container']}>
        <h1>Mis Viajes</h1>
        <MyHistory />
      </div>
    );
  }

}

export default (Profile);
