/* eslint-disable global-require */
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './modules/App/App';
import NotFoundPage from './components/NotFound/NotFoundPage';
import Profile from './modules/Profile/Profile';
import Politicas from './modules/Home/Policies';
import LocalTravels from './modules/Search/pages/LocalSearch/LocalSearch';
import NationalTravels from './modules/Search/pages/NationalSearch/NationalSearch';
import EditForm from './modules/Profile/components/ProfilePages/EditForm';
import EditFormCell from './modules/Profile/components/ProfilePages/EditFormCell';

// require.ensure polyfill for node
if (typeof require.ensure !== 'function') {
  require.ensure = function requireModule(deps, callback) {
    callback(require);
  };
}

/* Workaround for async react routes to work with react-hot-reloader till
  https://github.com/reactjs/react-router/issues/2182 and
  https://github.com/gaearon/react-hot-loader/issues/288 is fixed.
 */
if (process.env.NODE_ENV !== 'production') {
  // Require async routes only in development for react-hot-reloader to work.
  require('./modules/Post/pages/PostListPage/PostListPage');
  require('./modules/Post/pages/PostDetailPage/PostDetailPage');
  require('./modules/Home/components/Login/SignupPage/SignupPage');
  require('./modules/Payment/Payment');
}
// react-router setup with code-splitting
// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
export default (
  <Route path="/" component={App}>
    <IndexRoute
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Home/Home').default);
        });
      }}
    />
    <Route
      path="/travels/:cuid"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Travel/pages/TravelDetailPage/TravelDetailPage').default);
        });
      }}
    />
    <Route exact path="/profile" component={Profile} />
    <Route exact path="/policies" component={Politicas} />
    <Route exact path="/local_travels" component={LocalTravels} />
    <Route exact path="/national_travels" component={NationalTravels} />
    <Route exact path="/edit_form/:userID" component={EditForm} />
    <Route exact path="/edit_form_cell/:userID" component={EditFormCell} />
    <Route
      exact
      path="/payment/:cuid"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Payment/Payment').default);
        });
      }}
    />
    <Route path="*" component={NotFoundPage} />
  </Route>
);
