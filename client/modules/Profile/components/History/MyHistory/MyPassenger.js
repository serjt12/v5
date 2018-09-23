import React, { Component } from 'react';
import styles from './myhistory.css';
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
    };
  }
  componentDidMount() {
    this.props.dispatch(fetchTravels());
  }
  onStarClickHalfStar(rating, prevValue, author, e) {
    const { props: { userID } } = this;
    const xPos = (e.pageX - e.currentTarget.getBoundingClientRect().left) / e.currentTarget.offsetWidth;

    if (xPos <= 0.5) {
      rating -= 0.5;
    }
    this.props.dispatch(addRatingRequest(rating, userID, author))
    console.log('author: %s, rating: %s, prevValue: %s', author, rating, prevValue);
  }
  onCloseModal = () => {
    this.setState({
      showModal: false
    })
  };
  render() {
    // console.log(this.props.msg)
    const superVar = (this.props.msg !== undefined && this.props.msg !== '')
    // console.log('My passenger props', props)
    const TravelsWithPassenger = (this.props.travels !== undefined) ? this.props.travels.filter(travel => (travel.passenger.length !== 0 )) : [];
    // console.log('viajes donde yo soy el pasajero', TravelsWithPassenger)
    return (
      <div>
        <Modal open={superVar && this.state.showModal} onClose={this.onCloseModal} center>
          <h2>{this.props.msg}</h2>
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
                    {(moment(Date.now()).format() > travel.date) &&
                      <StarRatingComponent
                        name={travel.author._id}
                        starColor="#2aa89a"
                        emptyStarColor="#2aa89a"
                        value={(travel.author.likes) ? travel.author.likes.likeCount : 0}
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
                      />}
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

function mapStateToProps(store) {
  return {
    userID: store.auth.currentUser._id,
    travels: getTravels(store),
    msg: store.travel.msg,
  };
}

export default connect(mapStateToProps)(MyPassenger);
