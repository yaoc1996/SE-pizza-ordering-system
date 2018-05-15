import React, { Component } from 'react';

import {
  loadApi,
  postStore,
  getManagerStore,
} from 'lib';

class Setup extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
    }

    this.onSetup = this.onSetup.bind(this);
  }

  componentWillMount() {
    const token = localStorage.getItem('token')

    if (token) {
      getManagerStore(token)
        .then(json => {
          if (json && json.success) {
            if (json.store) {
              this.props.history.push('/management/manager')
            }
          } else {
            json && alert(json.message);
            this.props.history.push('/home');
          }
        })
    } else {
      alert('unauthorized');
      this.props.history.push('/home')
    }
  }

  onSetup(e) {
    e.preventDefault();
    
    const name = e.target.name.value;
    const address = e.target.address.value;
    const token = localStorage.getItem('token');

    const url = 'https://maps.googleapis.com/maps/api/js';
    const params = {
      key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      v: '3.exp',
      libraries: 'places',
    }

    loadApi('google-maps', url, params)
      .then(({google}) => {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address }, (results, status) => {
          if (status === 'OK') {
            const { lat, lng } = results[0].geometry.location;
            postStore(token, { 
              name,
              address: results[0].formatted_address,
              lat: lat(),
              lng: lng(),
            })
              .then(json => {
                if (json && json.success) {
                  this.props.history.push('/management/manager');
                } else {
                  json && alert(json.message);
                }
              })
          } else {
            alert('invalid address');
          }
        })
      });
    
  }

  render() {

    return (
      <div className='centered-hv fade-in' >
        <label className='font-txl font-bold font-lightgrey' >Setup</label>
        <br /><br />
        <label className='font-lg font-bold' >New Store</label>
        <br /><br />
        <label className='font-xs font-bold font-lightgrey' >
          Online Pizza Delivery System
        </label>
        <br /><br /><br />
        <form className='form'
              onSubmit={this.onSetup} >
          <div className='form-field'>
            <label>Store Name:</label>
            <input  type='text'
                    name='name'
                    autoFocus
                    required />
          </div>
          <div className='form-field'>
            <label>Address:</label>
            <input  type='text'
                    name='address'
                    required />
          </div>
          <br /><br /><br />        
          <button className='btn-pink btn-md' >Submit</button>
          <button className='btn-md btn-pink margin-sm'
                  type='button'
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
        </form>
      </div>
    )
  }
}

export default Setup;
