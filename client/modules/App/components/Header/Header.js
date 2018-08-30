import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import Home from './location.png'
// Import Style
import styles from './Header.css';

export function Header(props) {
  const languageNodes = props.intl.enabledLanguages.map(
    lang => <li key={lang} onClick={() => props.switchLanguage(lang)} className={lang === props.intl.locale ? styles.selected : ''}>{lang}</li>
  );
  return (
    <div className={styles.header}>
      <div className={styles['language-switcher']}>
        <ul>
          <li><FormattedMessage id="switchLanguage" /></li>
          {languageNodes}
          <li>
            <Link to="/"><img src={Home} alt="Home tobcity" /></Link>
          </li>
          <li>
          {
            (props.Logged)
            ? <a href="#" className={styles['add-travel-button']} onClick={props.toggleAddTravel}><FormattedMessage id="addTravel" /></a>
            : null
          }
          </li>
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
