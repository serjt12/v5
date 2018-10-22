import React, { PureComponent } from 'react';
// import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import TravelForm from './TravelForm';
import TravelTitle from './images/titlepublicar.png';
import { connect } from 'react-redux';

// Import Style
import styles from './TravelCreateWidget.css';

export class TravelCreateWidget extends PureComponent {
  handleBack() {
    this.props.router.goBack();
  }
  render() {
    console.log(this)
    const cls = `${styles.form} ${(this.props.showAddTravel ? styles.appear : '')}`;
    return (
      <div className={cls}>
        <div className={styles['form-content']}>
          <div className={styles['form-top']}>
            <span onClick={() => this.handleBack()} className={styles.closeadd}>X</span>
            <img className={styles['form-title']} src={TravelTitle} alt="Publica tus viajes con Tobcity" />
          </div>
          <TravelForm />
        </div>
      </div>
    );
  }
}
function mapStateToProps(store, props) {
  console.log(store)
  console.log(props)
  return {
    props,
  };
}

export default connect(mapStateToProps)(TravelCreateWidget);
