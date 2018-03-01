import React, { Component } from 'react';
import _ from 'lodash';

import {
  loadGoogleMaps,
  initGoogleMaps,
  initSearchBox,
} from './_lib';

import {
  Map,
} from './_styled';

import { GoogleMapsApiKey } from './config/config.json';

const url = 'https://maps.googleapis.com/maps/api/js?';
const params = {
  key: GoogleMapsApiKey,
  v: '3.exp',
  libraries: 'places',
  callback: 'googleMapsApiCallback',
}

const midTownManhattanCoords = {
  lat: 40.7549,
  lng: -73.9840,
}

class GoogleMaps extends Component {
  constructor() {
    super();

    this.state = {
      loadingMap: true,
    }

    this.googleMapsApiCallback = this.googleMapsApiCallback.bind(this);
    this.createStoreMarkers = this.createStoreMarkers.bind(this);
    this.reAdjustMarker = this.reAdjustMarker.bind(this);
    this.reAdjustCenter = this.reAdjustCenter.bind(this);
    this.setMapZoom = this.setMapZoom.bind(this);
  }

  componentDidMount() {
    window.googleMapsApiCallback = this.googleMapsApiCallback;
    loadGoogleMaps(url, params);
  }
  
  componentWillReceiveProps(props) {
    const { stores } = props;
    
    if (this.props.stores !== stores) {
      _.forEach(this.storeMarkers, x => x.setMap(null));
      this.storeMarkers = this.createStoreMarkers(stores);
    }
  }
  
  googleMapsApiCallback() {
    this.setState({ loadingMap: false });
    
    const { inputId } = this.props;    
    const obj = initGoogleMaps(midTownManhattanCoords);
    this.marker = obj.marker;
    this.map = obj.map;
    this.searchBox = initSearchBox(
      inputId,
      this.map, 
      this.reAdjustMarker, 
      this.reAdjustCenter,
      this.setMapZoom,
    );
  }

  createStoreMarkers(stores) {
    const { google } = window;
    if (google) {
      const markers = _.map(stores, x => 
        new google.maps.Marker({
          position: {
            lat: x.lat,
            lng: x.lng,
          },
          map: this.map,
          animation: google.maps.Animation.DROP,
        })
      )
      return markers;
    }
  }

  reAdjustMarker(latLng) {
    this.marker.setPosition(latLng);
  }

  reAdjustCenter(latLng) {
    this.map.panTo(latLng);
  }

  setMapZoom(zoom) {
    this.map.setZoom(zoom);
  }

  render() {
    const { loadingMap } = this.state;
    return (
      loadingMap
        ? <div>Loading</div>
        : <Map id='map' />
    )
  }
}

export default GoogleMaps;

GoogleMaps.defaultProps = {
  stores: [],
}