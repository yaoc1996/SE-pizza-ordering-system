import React, { Component } from 'react';

import {
  GoogleMaps,
} from './components';

import {
  HomeView,
  HeaderView,
  MapView,
  SearchBox,
} from './styled';

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
    }, 3000);
  }
  render() {
    const { stores } = this.state;
    const searchBoxProps = {
      id: 'search-box',
      placeholder: '147 70th st, Brooklyn, NY 11209...',
      onKeyUp: this.onSearch,
    };
    const mapProps = {
      stores,
      inputId: 'search-box',
    };

    return (
      <HomeView>
        <HeaderView>
          <SearchBox { ...searchBoxProps} />
        </HeaderView>
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