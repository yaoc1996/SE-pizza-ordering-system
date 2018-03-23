import React, { Component } from 'react';

import GoogleMaps from './GoogleMaps';

import {
  HomeView,
  HeaderView,
  MapView,
  SearchBox,
} from './styled';

import {
  FloatRButton,
} from 'styled';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      stores: [],
    }

    this.goTo = this.goTo.bind(this);
  }

  goTo(dest) {
    return () => {
      this.props.history.push(dest);
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        stores: fakeLocations,
      })
    }, 3000);
  }

  render() {
    const {
      onSearch,
      goTo,
    } = this;

    const { stores } = this.state;

    return (
      <HomeView>
        <HeaderView>
          <FloatRButton
            onClick={goTo('signup')} >Sign Up</FloatRButton>
          <FloatRButton
            onClick={goTo('login')} >Login</FloatRButton>
          <SearchBox
            id='search-box'
            placeholder='Enter an address...'
            onKeyUp={onSearch} />
        </HeaderView>
        <MapView>
          <GoogleMaps
            stores={stores} />
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