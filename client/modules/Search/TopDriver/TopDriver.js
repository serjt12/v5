import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import StarRatingComponent from 'react-star-rating-component';
import styles from './TopDriver.css';
import { connect } from 'react-redux';
import { fetchTravels } from '../../Travel/TravelActions';
import { getTravels } from '../../Travel/TravelReducer';


const TopDriver = ({ travel }) => {
  const avg = travel.author.rateValue / travel.author.rateCount;
  return (
    <section>
      <div className={styles['top-driver-image']}>
        <img className={styles.avatar} src={travel.author.avatar} alt={`Soy ${travel.author.name}`} />
      </div>
      <div className={styles['top-driver-name']}>
        <p>{travel.author.name.toUpperCase()}</p>
      </div>
      <div className={styles['travelinfo-cupos']}>
        <StarRatingComponent
          className={styles.stars}
          name={'Puntaje de ${name}'}
          editing={false}
          starColor="#fff"
          emptyStarColor="#fff"
          value={avg}
          renderStarIcon={(index, value) => {
            return (
              <span>
                <i className={index <= value ? 'fas fa-star' : 'far fa-star'} />
              </span>
            );
          }}
          renderStarIconHalf={() => {
            return (
              <span>
                <span style={{ position: 'absolute' }}><i className="far fa-star" /></span>
                <span><i className="fas fa-star-half" /></span>
              </span>
            );
          }}
        />
      </div>
    </section>
  );
};


class DriverSlider extends Component {
  componentDidMount() {
    this.props.dispatch(fetchTravels());
  }
  render() {
    const allTravels = this.props.travels;
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
      autoplay: true,
      arrows: false,
    };
    return (
      <div className={styles['top-driver-container']}>
        <h4 className={styles.titletop}>TOP Conductores</h4>
        <Slider {...settings}>
            {allTravels.map(travel => (<TopDriver key={travel._id} travel={travel} />))}
        </Slider>
      </div>
    );
  }
}
TopDriver.propTypes = {
  travel: PropTypes.object,
  dispatch: PropTypes.func,
};
DriverSlider.propTypes = {
  travels: PropTypes.array,
  dispatch: PropTypes.func,
};

function mapStateToProps(store) {
  return {
    travels: getTravels(store),
  };
}

export default connect(mapStateToProps)(DriverSlider);
