import React, { PureComponent } from 'react';
import ProfilePage from './components/ProfilePages/ProfileMain';
import HystoryPage from './components/History/History';
import SearchPage from '../Search/Search';
import requireAuth from '../../components/hocs/requireAuth';

class Profile extends PureComponent {
  render() {
    return (
      <div>
        <ProfilePage />
        <HystoryPage />
        <SearchPage />
      </div>
    );
  }

}

export default requireAuth(Profile);
