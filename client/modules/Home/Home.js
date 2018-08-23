import React, { PureComponent } from 'react';
import Logo from './components/Logo/Logo';
import Login from './components/Login/Login';

class Home extends PureComponent {
  render() {
    return (
      <div>
        <Logo />
        <Login />
      </div>
    );
  }

}

export default Home;
