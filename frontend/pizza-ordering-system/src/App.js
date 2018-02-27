import React, { Component } from 'react';
import './App.css';

import config from './config/config.json';

class App extends Component {
  constructor() {
    super();

    this.state = {
      message: null,
    }
  }

  componentDidMount() {
    fetch('/get')
      .then(res => res.json())
      .then(json => this.test = this.setState(json))
      .catch(err => console.log(err));
    fetch('/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'test2',
        email: 'test2',
        password: 'test2',
      })
    })
      .then(res => res.json())
      .then(json => console.log(json))
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div className="App">
        <div>{this.state.message}</div>
      </div>
    );
  }
}

export default App;
