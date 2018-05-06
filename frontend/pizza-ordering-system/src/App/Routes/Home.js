import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {
  loadApi,
} from 'lib';

const midTownManhattanCoords = {
  lat: 40.7549,
  lng: -73.9840,
}

const pizzaIcon = 'http://icons.iconarchive.com/icons/sonya/swarm/256/Pizza-icon.png';

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
        zoom: 16,
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
      if (!this.marker)
        this.marker = this.initMarker(google, midTownManhattanCoords);

      this.marker.setPosition(e.latLng);
      this.loadNearbyStores(google, e.latLng, 3);
    })

    return map;
  }

  initMarker(google, location) {
    const { map } = this;
    const marker = new google.maps.Marker({
      map: map,
      position: location,
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
      const places = searchBox.getPlaces();
      if (places.length === 0) return;
      
      const { location } = places[0].geometry
      if (!this.marker) this.marker = this.initMarker(google, location);      

      this.marker.setPosition(location);
      map.panTo(location);      
      map.setZoom(16);
      this.loadNearbyStores(google, location, 3)
    })

    return searchBox;
  }

  loadNearbyStores(google, location, n) {
    const placesService = new google.maps.places.PlacesService(this.map);
    placesService.nearbySearch({
      location,
      types: [ "restaurant" ],
      rankBy: google.maps.places.RankBy.DISTANCE,
    }, cb => {
      if (this.restaurantMarkers)
        this.restaurantMarkers.forEach(marker => marker.setMap(null))

      this.restaurantMarkers = cb.slice(0, n).map(place =>
        this.initMarker(google, place.geometry.location)
      )
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
          <div>
          <img className = 'logo' src="pizzalogosmall.png" alt="Pizza Logo" />
          {
            !this.props.user
              ? <div className='fit float-right'>
                  <Link to='/login'>
                    <button className='btn-md margin-sm btn-red'>
                      Login
                    </button>
                  </Link>
                  <Link to='/signup'>
                    <button className='btn-md margin-sm btn-red'>
                      Signup
                    </button> 
                  </Link>
                </div>
              : <div className='float-right fit font-md'>
                  <div className='fit margin-sm'>
                    <label className='fade-in'>
                      Welcome! &nbsp;
                      <label className='font-red'>
                        {this.props.user.firstname} {this.props.user.lastname}
                      </label>
                      &nbsp;
                    </label>
                  </div>
                  <br />
                  <button onClick={this.props.logout} 
                          className='float-right btn-md margin-sm btn-red'>
                    Logout
                  </button>
                </div>
          }
          </div>
          <br />
          <div className='home-search-area' >
            <input  className='input-fill'
                    id='search-box'
                    placeholder='Enter an address'
                    onKeyUp={onSearch} />
          </div>
          <button className='home-search-button' >
            <i className='material-icons'>search</i>
          </button>
        </div>

        <br />

        <div style={{ height: 'calc(100% - 156px)' }} >
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