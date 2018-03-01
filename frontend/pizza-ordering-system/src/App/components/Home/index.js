import React, { Component } from 'react';

import {
  GoogleMaps
} from './components';

import {
  HomeView,
  Header,
  AddressInput,
  MapView,
} from './_styled';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      stores: [],
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        stores: fakeLocations,
      })
    }, 5000);
    setTimeout(() => {
      this.setState({
        stores: [],
      })
    }, 10000);
    setTimeout(() => {
      this.setState({
        stores: fakeLocations,
      })
    }, 15000);
  }
  render() {
    const addressInputProps = {
      placeholder: '147 70th st, Brooklyn, NY 11209...',
    }

    const mapProps = {
      stores: this.state.stores,
    }

    return (
      <HomeView>
        <Header>
          <AddressInput { ...addressInputProps } />
        </Header>
        <MapView>
          <GoogleMaps { ...mapProps }/>
        </MapView>
      </HomeView>
    )
  }
}

export default Home;

const fakeLocations = [
  {
    lat: 40.742727,
    lng: -73.983244,
  },
  {
    lat: 40.746527,
    lng: -73.993244,
  },
  {
    lat: 40.752727,
    lng: -73.973244,
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