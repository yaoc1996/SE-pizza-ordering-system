import React, { Component } from 'react';
import _ from 'lodash';

import {
  url,
  params,
  midTownManhattanCoords,
} from './_constants';

import {
  loadGoogleMaps,
} from './_lib';

import {
  Map,
} from './_styled';


class GoogleMaps extends Component {
  constructor() {
    super();

    this.state = {
      loadingMap: true,
      markers: [],
    }

    this.initMap = this.initMap.bind(this);
  }



  componentDidMount() {
    window.initMap = this.initMap;
    loadGoogleMaps(url, params);
  }

  componentWillReceiveProps(props) {
    const { stores } = props;

    if (this.props.stores !== stores) {
      _.forEach(this.state.markers, x => x.setMap(null));
      this.setState({ 
        markers: this.createStoreMarkers(stores),
      })
    }
  }

  createStoreMarkers(stores) {
    const { google } = window;
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

  initMap() {
    this.setState({ loadingMap: false });

    const { google } = window;
    const mapDiv = document.getElementById('map');

    this.map = new google.maps.Map(mapDiv, {
      zoom: 14,
      center: midTownManhattanCoords,
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }],
        },
        {
          featureType: 'transit',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }],
        }
      ]
    });

    this.marker = new google.maps.Marker({
      position: midTownManhattanCoords,
      map: this.map,
      animation: google.maps.Animation.DROP,
    });

    google.maps.event.addListener(this.map, 'click', e => {
      this.marker.setPosition(e.latLng);
    })
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