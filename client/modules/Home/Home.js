import React, { PureComponent } from 'react';
import Logo from './components/Logo/Logo';
import Login from './components/Login/Login';
import AppInfo from './components/AppInfo/AppInfo';
import Road from './components/AppInfo/Road';
import styles from './home.css';

class Home extends PureComponent {
  render() {
    return (
      <div>
        <div className={styles['home-container']}>
          <Logo />
          <Login />
          <AppInfo />
        </div>
        <Road />
      </div>
    );
  }

}

export default Home;
