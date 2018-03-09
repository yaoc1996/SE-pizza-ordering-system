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
      message: null,
    }
  }

  componentDidMount() {

  }

  render() {

    return (
      <AppView>
        <SidePanel />
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
