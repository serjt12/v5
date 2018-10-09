import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };
  }
  onMarkerClick(props, marker) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  }
  render() {
    const style = {
      width: '200px',
      height: '200px',
    };
    if (!this.props.google) {
      return (<div>Loading...</div>);
    }

    return (
      <div
        style={{
          position: 'relative',
          display: 'inline-block',
          height: '215px',
        }}
      >
        <Map
          style={style}
          google={this.props.google}
          initialCenter={{
            lat: 6.2530408,
            lng: -75.56457369999998,
          }}
          center={{
            lat: this.props.lat,
            lng: this.props.lng,
          }}
          zoom={14}
        >
          <Marker
            onClick={this.onMarkerClick}
            icon={{
              url: '/img/icon.svg',
              // eslint-disable-next-line
              anchor: new google.maps.Point(32, 32),
              // eslint-disable-next-line
              scaledSize: new google.maps.Size(64, 64)
            }}
            name={"Current location"}
          />
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}
MapContainer.propTypes = {
  google: PropTypes.object,
  lat: PropTypes.number,
  lng: PropTypes.number,
};
// eslint-disable-next-line
export default GoogleApiWrapper({
  apiKey: 'AIzaSyCdiwD9iE5Fjz4ZHIe5-eNB_j_4SFf4uMw',
  v: '3.30',
  language: 'es',
})(MapContainer);
