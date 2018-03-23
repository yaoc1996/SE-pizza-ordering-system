import React, { Component } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import Home from './Home';

import {
  AppView,
  MainView,
} from './styled';

class App extends Component {
  constructor() {
    super();

    this.state = {
      store: null,
      user: null,
      collapsedSidePanel: false,
    }

    this.setAppState = this.setAppState.bind(this);
  }

  componentDidMount() {

  }

  setAppState(state) {
    this.setState(state);
  }

  render() {
    const {
      setAppState
    } = this;

    const {
      store,
      user,
      collapsedSidePanel,
    } = this.state;

    return (
      <AppView>
        <MainView>

          <Switch>
            <Route exact path='/home' component={Home} />
          </Switch>

        </MainView>
        
      </AppView>
    );
  }
}

export default withRouter(App);
