import React, { Component } from 'react';
import styles from './myhistory.css';
import PropTypes from 'prop-types';
import Modal from 'react-responsive-modal';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import StarRatingComponent from 'react-star-rating-component';
import moment from 'moment';
import { fetchTravels } from '../../../../Travel/TravelActions';
import { addRatingRequest } from '../../../../App/AppActions';
import { getTravels } from '../../../../Travel/TravelReducer';

class MyPassenger extends Component {
  constructor() {
    super();
    this.state = {
      showModal: true,
      rating_half_star: 0,
    };
  }
  componentDidMount() {
    this.props.dispatch(fetchTravels());
  }
  onStarClickHalfStar(rating, prevValue, travel, e) {
    const xPos = (e.pageX - e.currentTarget.getBoundingClientRect().left) / e.currentTarget.offsetWidth;
    if (xPos <= 0.5) {
      // eslint-disable-next-line
      rating -= 0.5;
    }
    this.props.dispatch(addRatingRequest(rating, travel, this.props.userID));
  }
  onStarHoverHalfStar(rating, prevValue, travel, e) {
    const xPos = (e.pageX - e.currentTarget.getBoundingClientRect().left) / e.currentTarget.offsetWidth;
    if (xPos <= 0.5) {
      // eslint-disable-next-line
      rating -= 0.5;
    }
    this.setState({
      rating_half_star: rating,
    });
  }
  onStarHoverOutHalfStar() {
    this.setState({
      rating_half_star: 0,
    });
  }
  onCloseModal = () => {
    this.setState({
      showModal: false,
    });
  };
  render() {
    const superVar = (this.props.msg !== undefined && this.props.msg !== '');
    const likeMsg = (this.props.msglike !== undefined && this.props.msglike !== '');
    const TravelsWithPassenger = (this.props.travels !== undefined) ? this.props.travels.filter(travel => (travel.passenger.length !== 0)) : [];
    return (
      <div>
        <Modal open={superVar && this.state.showModal} onClose={this.onCloseModal} center>
          <h2>{this.props.msg}</h2>
        </Modal>
        <Modal open={likeMsg && this.state.showModal} onClose={this.onCloseModal} center>
          <h2>{this.props.msglike}</h2>
        </Modal>
        <li className={styles.item}>
          <h1 className={styles['myhistory-title']}>MY PASSENGER TRAVELS</h1>
        </li>
        {TravelsWithPassenger.map((travel) => {
          return (
            <li key={travel._id} className={styles.item}>
              {(travel.passenger !== undefined) && travel.passenger.map((user) => {
                return (
                  <div key={user._id} className="">
                  {(user._id === this.props.userID) ?
                    <div>
                      <Link to={`/travels/${travel.cuid}`}>
                        <div className="travelText">
                            {travel.from}/{travel.to}/{moment(travel.date).format('MMM Do YY')}
                        </div>
                      </Link>
                    {(moment(Date.now()).format() > travel.date) ?
                      <StarRatingComponent
                        editing={(travel.author.likes.length !== 0) ? !travel.author.likes.map(like => like.like)[0] : true}
                        className={styles.starts}
                        name={travel._id}
                        starColor="rgb(42,168,154)"
                        emptyStarColor="rgb(42,168,154)"
                        value={travel.author.likes.length !== 0 ? travel.author.likes.map(like => like.value)[0] : this.state.rating_half_star}
                        onStarHoverOut={this.onStarHoverOutHalfStar.bind(this)}
                        onStarHover={this.onStarHoverHalfStar.bind(this)}
                        onStarClick={this.onStarClickHalfStar.bind(this)}
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
                      /> : null
                    }
                    </div>
                    : null}
                  </div>
              );
              })}
            </li>
          );
        })}
      </div>
   );
  }
}

MyPassenger.propTypes = {
  userID: PropTypes.string,
  dispatch: PropTypes.fun,
  msg: PropTypes.string,
  msglike: PropTypes.string,
  travels: PropTypes.object,
};

function mapStateToProps(store) {
  return {
    userID: store.auth.currentUser._id,
    travels: getTravels(store),
    msg: store.travel.msg,
    msglike: store.app.likeMsg,
  };
}

export default connect(mapStateToProps)(MyPassenger);
