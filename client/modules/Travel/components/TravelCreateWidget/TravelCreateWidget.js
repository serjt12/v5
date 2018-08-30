import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import TravelForm from './TravelForm';
// Import Style
import styles from './TravelCreateWidget.css';

export class TravelCreateWidget extends Component {
  render() {
    // console.log(this)
    const cls = `${styles.form} ${(this.props.showAddTravel ? styles.appear : '')}`;
    return (
      <div className={cls}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}><FormattedMessage id="createNewPost" /></h2>
          <TravelForm addTravel={this.props.addTravel} />
        </div>
      </div>
    );
  }
}

TravelCreateWidget.propTypes = {
  addTravel: PropTypes.func.isRequired,
  showAddTravel: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(TravelCreateWidget);
