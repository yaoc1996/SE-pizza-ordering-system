import React, { Component } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import {
  Home,
} from './components';

class App extends Component {
  constructor() {
    super();

    this.state = {
      message: null,
    }
  }

  componentDidMount() {

  }

  render() {
    const appStyle = {
      height: '100vh',
      width: '100vw',
      overflow: 'hidden',
    }
    return (
      <div className="App" style={appStyle}>
        <Switch>
          <Route exact path='/home' component={Home} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
