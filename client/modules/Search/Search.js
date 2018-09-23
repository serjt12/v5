import React, { PureComponent } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import styles from './search.css';
import Local from './images/local.png';
import Nacional from './images/nacional.png';

class Search extends PureComponent {
  render() {
    return (
      <section className={styles.searchwrap}>
      {(!this.props.showAddTravel) ?
        <div className={styles['search-container']}>
          <div className={styles['title-container']}>
            <h1>BUSCA TU <span className={styles['search-underline']}>VIAJE</span></h1>
          </div>
          <ul>
            <li className={styles.item}>
              <Link to="/local_travels">
                <img src={Local} alt="buscar viajes locales" className={styles['search-local']} />
              </Link>
            </li>
            <li>
              <Link to="/national_travels">
                <img src={Nacional} alt="buscar viajes nacionales" className={styles['search-nacional']} />
              </Link>
            </li>
          </ul>
        </div> : null
      }
      </section>
  );
  }
}

function mapStateToProps({ app }) {
  return {
    showAddTravel: app.showAddTravel,
  };
}

export default connect(mapStateToProps)(Search);
