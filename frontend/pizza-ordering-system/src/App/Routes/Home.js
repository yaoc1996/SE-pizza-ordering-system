import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {
  loadApi,
  getNearbyStores,
  withModal,
  getOrders,
  postRating,
} from 'lib';

import {
  Ratings,
} from 'components'; 

const midTownManhattanCoords = {
  lat: 40.7549,
  lng: -73.9840,
}

class Home extends Component {
  constructor() {
    super();

    this.state = {
      stores: [],
      pendingOrders: [],
      pendingRatings: [],
    }

    this.goTo = this.goTo.bind(this);
    this.initMap = this.initMap.bind(this);
    this.initMarker = this.initMarker.bind(this);
    this.initSearchBox = this.initSearchBox.bind(this);
    this.onStoreEnter = this.onStoreEnter.bind(this);
    this.getOrders = this.getOrders.bind(this);
    this.submitRating = this.submitRating.bind(this); 
  }

  goTo(dest) {
    return () => {
      this.props.history.push(dest);
    }
  }

  componentDidMount() {
    const url = 'https://maps.googleapis.com/maps/api/js';
    const params = {
      key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      v: '3.exp',
      libraries: ['places', 'loaders'],
    }

    loadApi('google-maps', url, params)
      .then(({ google }) => {
        if (google) {
          const {
            initMap,
            initSearchBox,
          } = this;
      
          this.map = initMap(google);
          this.searchBox = initSearchBox(google);
        } else {
          window.location.reload();
        }
      });

    if (this.props.user) {
      this.getOrders();
    }
    
    this.props.addForm('orders', props => 
    <div className='centered-hv bg-white padding-lg edge-rounded align-left'
           style={{
             maxHeight: '80%',
             overflow: 'auto',
            }} >
        <label>Pending Orders</label>
        <div className='line-h' />
        {
          this.state.pendingOrders.map((order, id) => 
            <div key={id}>
              <div className='padding-sm' >
                Your order at {order.vendor.name} is currently being prepared.
              </div>
              <div className='line-h' />
            </div>
          )
        }
        <br /><br />
        <label>Pending Ratings</label>
        <div className='line-h' />
        {
          this.state.pendingRatings.map((rating) => 
            <div id={`rating-${rating.id}`} key={`rating-${rating.id}`} > 
              <Ratings rating={rating} submitRating={this.submitRating} />
            </div>
          )
        }
      </div>
    )
    
  }
  getOrders() {   
    const token = localStorage.getItem('token');
    if (token) {
      getOrders(token)
        .then(json => {
          this.setState({
            pendingOrders: json.pendingOrders,
            pendingRatings: json.pendingRatings,
          })
        })
    }
  }

  submitRating(e) {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const id = parseInt(e.target.id.value, 10);
    const reason = e.target.reason.value;
    const value = parseInt(e.target.value.value, 10);

    if (token) {
      if (parseInt(value, 10) < 3 && reason === '') {
        alert('any rating < 3 must be give a reason')
      } else {
        postRating(token, {
          id,
          value,
          reason,         
        })
          .then(json => {
            if (json && json.success) {
              this.setState(state => ({
                pendingRatings: state.pendingRatings.filter(x => x.id !== id)
              }))
              const r = document.getElementById(`rating-${id}`)
              if (r) r.remove();
            } else {
              json && alert(json.message)
            }
          })
      }
        
    } else {
      window.location.reload()
    }
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

  onStoreEnter(id) {
    const destination = `/store?storeId=${id}`;
    return () => {
      if (this.props.user) {
        this.props.history.push(destination)
      } else {
        this.props.setAppState({
          redirectDest: destination,
        })
        this.props.history.push('/login')
      }
    }
  }

  loadNearbyStores(google, location, limit) {
    getNearbyStores({
      lat: location.lat(),
      lng: location.lng(),
      limit,
    })
      .then(json => {
        if (json && json.success) {
          if (this.storeMarkers)
            this.storeMarkers.forEach(marker => marker.setMap(null))
  
          this.storeMarkers = json.stores.map(store => {
            const marker = this.initMarker(google, {
              lat: store.lat,
              lng: store.lng,
            })

            const contentString = `
              <div>
                <h3>${store.name}</h3>
                <p>${store.address}</p>
                <button class='float-right' id='info-window'>Enter</button>
              </div>
            `

            const infoWindow = new google.maps.InfoWindow({
              content: contentString,
            })

            
            marker.infoWindow = infoWindow;

            const that = this;
            
            marker.addListener('click', function() {
              if (this.storeMarkers) {
                this.storeMarkers.forEach(marker => {
                  marker.infoWindow.close()
                })
              }
              infoWindow.open(this.map, marker);
              console.log(store)
              document.getElementById('info-window').onclick = that.onStoreEnter(store.id);
            })

            return marker;
          })
        }
      })
  }

  render() {
    const {
      onSearch,
    } = this;

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
                  <button className='float-right btn-md margin-sm btn-red'
                          onClick={this.props.setForm('orders')} >
                    Orders
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

export default withModal(Home);