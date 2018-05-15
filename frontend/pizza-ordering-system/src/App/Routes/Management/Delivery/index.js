import React, { Component } from 'react';

import {
  loadApi,
  withModal,
  getDeliveryStore,
  postDeliveryStore,
  postFinishDelivery,
  getOrders,
  postRating,
} from 'lib';

import {
  Ratings, 
} from 'components';

class Delivery extends Component {
  constructor() {
    super();

    this.state = {
      location: null,
      travelMode: 'WALKING',
      navigation: false,
      orders: [],
      pendingRatings: [],
    }

    this.initMap = this.initMap.bind(this);
    this.initMarker = this.initMarker.bind(this);
    this.getStore = this.getStore.bind(this);
    this.postStore = this.postStore.bind(this);
    this.completeTask = this.completeTask.bind(this);
    this.getOrders = this.getOrders.bind(this);
    this.submitRating = this.submitRating.bind(this);
  }

  componentDidMount() {
    const gmapsUrl = 'https://maps.googleapis.com/maps/api/js';
    const gmapsParams = {
      key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      v: '3.exp',
      libraries: ['places', 'loader'],
    }

    loadApi('google-maps', gmapsUrl, gmapsParams)
      .then(({google}) => {
        if (google) {
          const setLocation = location => {
            this.setState({
              location,
            }, () => {
              if (!this.map) {
                this.map = this.initMap(google);
                this.marker = this.initMarker(google);
                this.directionsService = new google.maps.DirectionsService();
                this.directionsDisplay = new google.maps.DirectionsRenderer();
                this.directionsDisplay.setMap(this.map)
              } else {
                this.marker.setPosition(location)
                this.map.panTo(location)
              }
            })  
          }
          
          const lat = parseFloat(window.localStorage.getItem('lat'))
          const lng = parseFloat(window.localStorage.getItem('lng'))
          if (lat && lng) {
            setLocation({
              lat,
              lng,
            })
          }
          
          navigator.geolocation.watchPosition(location => {
            window.localStorage.setItem('lat', location.coords.latitude);
            window.localStorage.setItem('lng', location.coords.longitude);
            console.log("Retrieved location and cached", location);
            if (location.lat && location.lng) {
              setLocation({
                lat: location.coords.latitude,
                lng: location.coords.longitude,
              })
            }
          })
        }
      })
    this.props.addForm('setup', props => 
      <div className='align-left centered-hv padding-lg edge-rounded bg-white'>
        <form onSubmit={this.postStore}>
          <p className='font-md' >You haven't setup a store yet.</p>
          <p className='font-md' >Please enter the store ID: </p>
          <input  className='input-fill' 
                  name='storeId' 
                  required />
          <br /><br />
          <button className='btn-md btn-pink font-md' >Submit</button>
          <br /><br />
          <button className='btn-md btn-pink font-md'
                  onClick={() => {
                    localStorage.removeItem('token');
                    this.props.setAppState({
                      type: '',
                      user: null,
                    }, () => {
                      this.props.history.push('/management/login')
                    })
                  }} >Logout</button>

        </form>
      </div>
    , true)
    
    this.getStore();
    this.getOrders();
  }

  postStore(e) {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const storeId = e.target.storeId.value;

    if (token) {
      postDeliveryStore(token, {
        storeId,
      })
        .then(json => {
          if (json && json.success) {
            if (json.store) {
              this.setState({
                store: json.store,
                orders: json.orders,
              })
              this.props.closeForm()();
            } else {
              json && alert(json.message);
            }
          } else {
            json && alert(json.message);
            this.props.history.push('/home')
          }
        })
    } else {
      this.props.history.push('/home');
      this.props.setAppState({
        type: '',
                      user: null,
      }, () => {
        this.props.history.push('/management/login')
      })
    }   
  }

  getStore() {
    const token = localStorage.getItem('token');
    if (token) {
      getDeliveryStore(token)
        .then(json => {
          console.log(json) 
          if (json && json.success) {
            if (json.statusUpdate) {
              alert(json.statusUpdate)
              window.location.reload();
            } else if (json.store) {
              this.setState({
                store: json.store,
                orders: json.orders,
              })
            } else {
              this.props.setForm('setup')();
            }
          } else {
            alert('error while getting store information')
            this.props.history.push('/home')
          }
        })
    } else {
      alert('unauthorized');
      this.props.history.push('/home');
    }
  }

  getOrders() {
    const token = localStorage.getItem('token');
    if (token) {
      getOrders(token)
        .then(json => {
          if (json && json.success) {
            this.setState({
              pendingRatings: json.pendingRatings,
            })
          } else {
            json && alert(json.message);
          }
        })
    } else {
      alert('unauthorized');
      this.props.history.push('/home');
    }
  }

  completeTask(id) {
    return () => {
      const token = localStorage.getItem('token');

      if (token) {
        postFinishDelivery(token, {
          id,
        })
          .then(json => {
            if (json && json.success) {
              this.getStore();
              this.getOrders();
            } else {
              json && alert(json.message);
            }
          })
      } else {
        this.props.history.push('/home');
      }
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
    const { location } = this.state;
    const map = new google.maps.Map(
      document.getElementById('delivery-map'), 
      {
        zoom: 14,
        center: location,
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
    return map
  }

  initMarker(google) {
    const { location } = this.state;    
    const { map } = this;
    const marker = new google.maps.Marker({
      map: map,
      position: location,
      animation: google.maps.Animation.DROP,
    });

    return marker;
  }

  initNavigation(destination) {
    const {
      location,
      travelMode,
    } = this.state;

    const DirectionsRequest = {
      origin: location,
      destination,
      travelMode,
      provideRouteAlternatives: true, 
    }
    
    console.log("initializing google maps directions api routing, destination:", destination);
    this.directionsService.route(DirectionsRequest, (result, status) => {
      if (status === 'OK') {
        console.log("routing successful")
        this.directionsDisplay.setDirections(result)
        this.setState({
          navigation: true,
        })
      } else {
        console.log("failure to route", result, status)
      }
    })
  }

  render() {
    return (
      <div className='fill align-center padding-lg scrollable'>
        <div  className='align-right'>
          <button className='btn-md btn-pink margin-sm'
                  onClick={() => {
                    localStorage.removeItem('token');
                    this.props.setAppState({
                      type: '',
                      user: null,
                    }, () => {
                      this.props.history.push('/management/login')
                    })
                  }} >
            Logout
          </button>
          <div className='line-h' />
        </div>
        <br />
        <div  className='fit no-transition no-animation'
              style={{
                height: 480,
                width: 480,
                border: '1px solid #eee',
              }}
              id='delivery-map'>


        </div>

        <div className='padding-lg align-left' >
          <label className='fit font-xl'>Orders</label>
          {
            this.state.orders.map((order, id) => {
              const initNavigation = this.initNavigation.bind(this, order.destination)

              return (
                <div className='padding-sm' key={`destination-${id}`}>
                  <div className='line-h' />
                  <br />
                  <label>Order to:&nbsp;
                    <div className='fit font-normal font-grey'>
                      {order.destination}
                    </div>
                  </label>
                  <br />
                  <div className='align-right'>
                    <button className='btn-md btn-grey'
                            onClick={initNavigation}>Start</button>&nbsp;&nbsp;
                    <button className='btn-md btn-grey'
                            onClick={this.completeTask(order.id)}>Finish</button>
                  </div>
                </div>
              )
            })
          }
          <br />
          <label className='fit font-xl'>Pending Ratings</label>
            {
              this.state.pendingRatings.map((rating) => 
                <div key={`rating-${rating.id}`} > 
                  <Ratings rating={rating} submitRating={this.submitRating} />
                </div>
              )
            }
        </div>
      </div>
    )
  }
}

export default withModal(Delivery);
