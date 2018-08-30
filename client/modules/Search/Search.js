import React from 'react';
import styles from './search.css';
import Local from './images/local.png';
import Nacional from './images/nacional.png';

const Search = () => (
  <section>
    <div className={styles['search-container']}>
      <div className={styles['title-container']}>
        <h1>Busca Tu <span className={styles['search-underline']}>viaje</span></h1>
      </div>
      <ul>
        <li className={styles.item}>
          <img src={Local} alt="buscar viajes locales" className={styles['search-local']} />
        </li>
        <li>
          <img src={Nacional} alt="buscar viajes nacionales" className={styles['search-nacional']} />
        </li>

      </ul>
    </div>
  </section>
);

export default Search;
