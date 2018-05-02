import React, { Component } from 'react';

import {
  loadApi,
} from 'lib';

const midTownManhattanCoords = {
  lat: 40.7549,
  lng: -73.9840,
}

class Delivery extends Component {
  constructor() {
    super();

    this.state = {
      location: null,
      travelMode: 'WALKING',
      navigation: false,
    }

    this.initMap = this.initMap.bind(this);
    this.initMarker = this.initMarker.bind(this);
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
      })

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
    const { google } = window;
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
      if (status == 'OK') {
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
      <div className='fill align-center padding-lg'>
        <label className='fit margin-lg'>Delivery</label>
        <br />
        <div  className='fit no-transition no-animation'
              style={{
                height: 480,
                width: 480,
                border: '1px solid #eee',
              }}
              id='delivery-map'>


        </div>

        <div  className='padding-lg align-left'
              style={{
                height: 'calc(100% - 480px)',
                width: '100%',
              }} >
            <label className='fit font-dxl'>Orders</label>
            {
              sampleOrders.map(order => {
                const initNavigation = this.initNavigation.bind(this, order.destination)

                return <div className='padding-sm'>
                  <div className='line-h' />
                  
                  <label>Order to: {order.destination}</label>
                  <br />
                  <div className='align-right'>
                    <button onClick={initNavigation}>Start</button>
                  </div>
                </div>
              })
            }
        </div>
      </div>
    )
  }
}

export default Delivery;

const sampleOrders = [{
  destination: 'korea town',
}, {
  destination: 'midtown manhattan',
}, {
  destination: 'bayridge brooklyn',
}, {
  destination: 'ccny',
}, {
  destination: 'flushing',
}]