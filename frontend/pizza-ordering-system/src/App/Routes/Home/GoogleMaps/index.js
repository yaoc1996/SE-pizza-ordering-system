import React, { Component } from 'react';
import _ from 'lodash';

import loadGoogleMaps from 'lib/loadGoogleMaps';
import initGoogleMaps from 'lib/initGoogleMaps';
import initSearchBox from 'lib/initSearchBox';
import initStoreMarkers from 'lib/initStoreMarkers';

import {
  Map,
} from './styled';

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
    this.reAdjustMarker = this.reAdjustMarker.bind(this);
    this.reAdjustCenter = this.reAdjustCenter.bind(this);
    this.setMapZoom = this.setMapZoom.bind(this);
  }

  componentDidMount() {
    window.googleMapsApiCallback = this.googleMapsApiCallback;
    loadGoogleMaps(url, params);
  }
  
  componentWillReceiveProps(props) {
    const { map } = this;
    const { 
      stores,
      redirectToStore,
    } = props;
    
    if (this.props.stores !== stores) {
      _.forEach(this.storeMarkers, x => x.setMap(null));
      this.storeMarkers = initStoreMarkers({
        stores,
        map,
        redirectToStore,
      });
    }
  }
  
  googleMapsApiCallback() {
    this.setState({ loadingMap: false });
    
    const { map, marker } = initGoogleMaps(midTownManhattanCoords);
    this.map = map;
    this.marker = marker;
    this.searchBox = initSearchBox(
      'search-box',
      this.map, 
      this.reAdjustMarker, 
      this.reAdjustCenter,
      this.setMapZoom,
    );
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
        : <Map
            id='map' />
    )
  }
}

export default GoogleMaps;

GoogleMaps.defaultProps = {
  stores: [],
}