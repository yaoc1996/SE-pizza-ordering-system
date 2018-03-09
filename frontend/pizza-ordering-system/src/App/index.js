import React, { Component } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import SidePanel from './SidePanel';
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

    const sidePanelProps = {
      store,
      user,
      setAppState,
      collapsedSidePanel,
    }

    return (
      <AppView>
        <SidePanel { ...sidePanelProps } />
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
