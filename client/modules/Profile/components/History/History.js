import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styles from './history.css';
import MyHistory from './MyHistory/MyHistory';
import Title from '../ProfilePages/images/title.png';
class History extends PureComponent {
  render() {
    return (

      <div className={styles.historywrap}>
      {(!this.props.showAddTravel) ?
        <div className={styles['history-container']}>
          <img className={styles.title} src={Title} alt="Mis Viajes Tobcity" />
          <MyHistory />
        </div> : null}
      </div>
    );
  }

}

function mapStateToProps({ app: { showAddTravel } }) {
  // console.log(store)
  return { showAddTravel };
}


export default connect(mapStateToProps)(History);
