import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loading from 'react-loading-components';

// Import Style
import styles from './App.css';

// Import Components
import Helmet from 'react-helmet';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

// Import Actions
import { toggleAddTravel } from './AppActions';
import { fetchCurrentUser } from '../Home/AuthActions';
import { switchLanguage } from '../../modules/Intl/IntlActions';

let DevTools;
if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line global-require
  DevTools = require('./components/DevTools').default;
}

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isMounted: true });
      this.props.dispatch(fetchCurrentUser());
    }, 1);// eslint-disable-line
  }

  toggleAddTravellSection = () => {
    this.props.dispatch(toggleAddTravel());
  };

  render() {
    return (
      <div>
        {this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' && <DevTools />}
        <div className={styles.main}>
          <Helmet
            title="Tobcity Divide tus gastos"
            titleTemplate="%s - Web App"
            meta={[
              { charset: 'utf-8' },
              {
                'http-equiv': 'X-UA-Compatible',
                content: 'IE=edge',
              },
              {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
              },
            ]}
          />
          <Header
            switchLanguage={lang => this.props.dispatch(switchLanguage(lang))}
            intl={this.props.intl}
            toggleAddTravel={this.toggleAddTravellSection}
            Logged={(this.props.auth.currentUser)}
          />
          <div className={styles.container}>
            {(this.state.isMounted) ? this.props.children : <Loading type="oval" width={200} height={200} fill="#00BFB5" />}
          </div>
          {(!this.props.showAddTravel) ? <Footer /> : null}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  auth: PropTypes.object,
  showAddTravel: PropTypes.bool,
};


// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    showAddTravel: store.app.showAddTravel,
    intl: store.intl,
    auth: store.auth,
  };
}

export default connect(mapStateToProps)(App);
