import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './Header.css';

export function Header(props) {
  return (
    <div className={styles.header}>
      <div className={styles['language-switcher']}>
        <ul>
          {
            (props.Logged)
            ?
            (
              <div className={styles.btncont}>
                <li>
                  <a href="#" className={styles['add-travel-button']} onClick={props.toggleAddTravel}><FormattedMessage id="addTravel" /></a>
                </li>
                <li>
                  <a href="http://localhost:8000/api/logout" className={styles['logout-button']} ><FormattedMessage id="logout" /></a>
                </li>
              </div>
            )
            : null
          }
        </ul>
      </div>
    </div>
  );
}

Header.contextTypes = {
  router: PropTypes.object,
};

Header.propTypes = {
  toggleAddTravel: PropTypes.func.isRequired,
  switchLanguage: PropTypes.func.isRequired,
  Logged: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  intl: PropTypes.object.isRequired,
};

export default Header;
