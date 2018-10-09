import React, { PureComponent } from 'react';
// import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import TravelForm from './TravelForm';
import TravelTitle from './images/titlepublicar.png';

// Import Style
import styles from './TravelCreateWidget.css';

export class TravelCreateWidget extends PureComponent {
  render() {
    const cls = `${styles.form} ${(this.props.showAddTravel ? styles.appear : '')}`;
    return (
      <div className={cls}>
        <div className={styles['form-content']}>
          <img className={styles['form-title']} src={TravelTitle} alt="Publica tus viajes con Tobcity" />
          <TravelForm />
        </div>
      </div>
    );
  }
}

export default (TravelCreateWidget);
