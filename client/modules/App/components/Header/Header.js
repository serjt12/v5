import React from 'react';
import PropTypes from 'prop-types';
import Salir from './images/cerrarwhite.png';
import Postular from './images/postular.png';
import Hamburguer from './Hamburger';
// Import Style
import styles from './Header.css';


export function Header(props, context) {
  return (
    <div className={styles.header}>
      <div className={styles['language-switcher']}>
        <ul>
          <li><Hamburguer Logged={props.Logged} /></li>
          {
            (props.Logged)
            ?
            (
              <div className={styles.btncont}>
                <li>
                {
                  context.router.isActive('/profile', true) ?
                    <a href="#" className={styles['add-travel-button']} onClick={props.toggleAddTravel}><img src={Postular} alt="Postular un viaje" /></a>
                  : null
                }
                </li>
                <li>
                  <a href="http://localhost:8000/api/logout" className={styles['logout-button']} ><img src={Salir} alt="Cerrar Sesion" /></a>
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
