import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {
  loadApi,
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

    loadApi('google-maps', url, params)
      .then(({google}) => {
        if (google) {
          const {
            initMap,
            initSearchBox,
          } = this;
      
          this.map = initMap(google);
          this.searchBox = initSearchBox(google);
        } else {
          window.alert('failed to load google maps');
        }
      });
  }

  initMap(google) {
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
      if (!this.marker) this.marker = this.initMarker(google);

      this.marker.setPosition(e.latLng);
      this.loadNearbyStores(google, e.latLng, 5);
    })

    return map;
  }

  initMarker(google) {
    const { map } = this;
    const marker = new google.maps.Marker({
      map: map,
      position: midTownManhattanCoords,
      animation: google.maps.Animation.DROP,
    });

    return marker;
  }

  initSearchBox(google) {
    const { map } = this;
    const searchBox = new google.maps.places.SearchBox(
      document.getElementById('search-box'),
    );

    map.addListener('bounds_changed', () => {
      searchBox.setBounds(map.getBounds());
    })

    searchBox.addListener('places_changed', () => {
      if (!this.marker) this.marker = this.initMarker(google);      

      const places = searchBox.getPlaces();
      if (places.length === 0) return;
      
      const { location } = places[0].geometry
      this.marker.setPosition(location);
      map.panTo(location);      
      map.setZoom(14);
    })

    return searchBox;
  }

  loadNearbyStores(google, location, n) {
    const placesService = new google.maps.places.PlacesService(this.map);
    console.log(placesService);
    placesService.nearbySearch({
      location,
      radius: 5000,
      types: [ "restaurant" ],
      limit: 3,
    }, cb => {
      this.restaurantMarkers = []
      
    })
  }

  render() {
    const {
      onSearch,
    } = this;

    const { stores } = this.state;

    return (
      <div className='fill' >
        <div className='block align-left' >
          <div className='home-search-area' >
            <input  className='input-fill'
                    id='search-box'
                    placeholder='Enter an address'
                    onKeyUp={onSearch} />
          </div>
          <button className='home-search-button' >
            <i className='material-icons'>search</i>
          </button>

          <Link to='/login'>
            <button className='float-right btn-md margin-sm btn-blue'>
              Login
            </button>
          </Link>
          <Link to='/signup'>
            <button className='float-right btn-md margin-sm btn-blue'>
              Signup
            </button> 
          </Link>
        </div>

        <div style={{ height: 'calc(100% - 56px)' }} >
          <div  className='no-animation no-transition fill'
                id='map' />
        </div>
      </div>
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