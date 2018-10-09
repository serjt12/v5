import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import moment from 'moment';
import styles from './Logo.css';
import { connect } from 'react-redux';
import { fetchTravels } from '../../../Travel/TravelActions';
import { getTravels } from '../../../Travel/TravelReducer';


const TravelInfo = ({ travel }) => {
  return (
    <section className={styles['travelinfo-container']}>
      <div className={styles['travelinfo-image']}>
        <img className={styles.avatar} src={travel.author.avatar} alt={`Soy ${travel.author.name}`} />
      </div>
      <div className={styles['travelinfo-name']}>
        <h3>{travel.author.name.toUpperCase()}</h3>
      </div>
      <div className={styles['travelinfo-info']}>
        <p>RECORRIDO:</p>
        <h5>{travel.from.toUpperCase()}/{travel.to.toUpperCase()}</h5>
        <h6>Hora de partida: {moment(travel.date).format('HH mm')}</h6>
      </div>
      <div className={styles['travelinfo-cupos']}>
        <p>PUESTOS: </p><h3>{travel.sits}/4</h3>
      </div>
    </section>
  );
};


class SimpleSlider extends Component {
  componentDidMount() {
    this.props.dispatch(fetchTravels());
  }
  render() {
    const allTravels = this.props.travels;
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
    };
    return (
      <Slider {...settings}>
          {allTravels.map(travel => (<TravelInfo key={travel._id} travel={travel} />))}
      </Slider>
    );
  }
}
TravelInfo.propTypes = {
  travel: PropTypes.array,
  dispatch: PropTypes.func,
};
SimpleSlider.propTypes = {
  travels: PropTypes.array,
  dispatch: PropTypes.func,
};

function mapStateToProps(store) {
  return {
    travels: getTravels(store),
  };
}

export default connect(mapStateToProps)(SimpleSlider);
