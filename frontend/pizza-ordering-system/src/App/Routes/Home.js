import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {
  Input,
  FloatRButton,
  Block,
  DashHeader,
  PaddingBox,
  MaterialIcon,
} from 'styled';

import {
  loadGoogleMaps,
} from 'lib';

const midTownManhattanCoords = {
  lat: 40.7549,
  lng: -73.9840,
}

class Home extends Component {
  constructor() {
    super();

    this.state = {
      stores: [],
    }

    this.goTo = this.goTo.bind(this);
    this.googleMapsApiCallback = this.googleMapsApiCallback.bind(this);
    this.initMap = this.initMap.bind(this);
    this.initMarker = this.initMarker.bind(this);
    this.initSearchBox = this.initSearchBox.bind(this);
  }

  goTo(dest) {
    return () => {
      this.props.history.push(dest);
    }
  }

  componentDidMount() {
    const url = 'https://maps.googleapis.com/maps/api/js?';
    const params = {
      key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      v: '3.exp',
      libraries: 'places',
    }

    loadGoogleMaps(url, params)
      .then(this.googleMapsApiCallback);
  }

  googleMapsApiCallback() {
    const {
      initMap,
      initMarker,
      initSearchBox,
    } = this;

    this.map = initMap();
    this.searchBox = initSearchBox();
  }

  initMap() {
    const { google } = window;
    const map = new google.maps.Map(
      document.getElementById('map'), 
      {
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
      }
    );

    google.maps.event.addListener(map, 'click', e => {
      if (!this.marker) {
        this.marker = this.initMarker();
      }

      this.marker.setPosition(e.latLng);
      // fetch 3 new stores here
    })

    return map;
  }

  initMarker() {
    const { google } = window;
    const { map } = this;
    const marker = new google.maps.Marker({
      map: map,
      position: midTownManhattanCoords,
      animation: google.maps.Animation.DROP,
    });

    return marker;
  }

  initSearchBox() {
    const { google } = window;
    const { 
      map,
      marker,
    } = this;
    const searchBox = new google.maps.places.SearchBox(
      document.getElementById('search-box'),
    );

    map.addListener('bounds_changed', () => {
      searchBox.setBounds(map.getBounds());
    })

    searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces();

      if (places.length === 0) return;
      
      const { location } = places[0].geometry
      marker.setPosition(location);
      map.panTo(location);      
      map.setZoom(14);      
    })

    return searchBox;
  }

  render() {
    const {
      onSearch,
      goTo,
    } = this;

    const { stores } = this.state;

    return (
      <Block
        height='100%' >
        <DashHeader>
          <PaddingBox>
            <MaterialIcon>search</MaterialIcon>
          </PaddingBox>
          <div 
            style={{ 
              display: 'inline-block', 
              maxWidth: 400, 
              width: 'calc(100% - 246px)' 
            }} >
            <Input
              id='search-box'
              placeholder='Enter an address'
              onKeyUp={onSearch} />
          </div>
          <PaddingBox
            style={{ float: 'right' }}>
            <Link to='/login'>
              <FloatRButton
                color='white'
                background='#303F9F'
                hover='#5C6BC0'
                active='#333' >Login</FloatRButton>
            </Link>
            <Link to='/signup'>
              <FloatRButton
                color='white'
                background='#303F9F'
                hover='#5C6BC0'
                active='#333' >Signup</FloatRButton>
            </Link>
          </PaddingBox>
        </DashHeader>
        <Block
          height='calc(100% - 54px)' >
          <div 
            id='map'
            style={{ width: '100%', height: '100%' }} />
        </Block>
      </Block>
    )
  }
}

export default Home;

const fakeLocations = [
  {
    lat: 40.742727,
    lng: -73.983244,
    name: 'joes pizza',
    address: '123 123st st',
  },
  {
    lat: 40.746527,
    lng: -73.993244,
    name: 'pizza paradise',
    address: '123 123st st',
  },
  {
    lat: 40.752727,
    lng: -73.973244,
    name: 'nom nom',
    address: '123 123st st',
  }
]

/*
  40.759613               40.756362
  -74.000822              -73.975846


  40.739324               40.739391
  -74.001080              -73.975588


  40.739324 < lat < 40.759613
  -74.001080 < lng < -73.975588
*/