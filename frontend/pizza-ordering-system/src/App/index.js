import React, { Component } from 'react';

import { withRouter, Switch, Route } from 'react-router-dom';

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
    return (
      <div className="App">
        <Switch>
          <Route exact path='/home' />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
