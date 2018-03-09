import React, { Component } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import _ from 'lodash';

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
      cart: null,
    }

    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLoginFailure = this.onLoginFailure.bind(this);
  }

  componentDidMount() {

  }

  onLoginSuccess() {
    const {
      store,
    } = this.state;
    
    if (store) {
      //redirect to store menu page
    }
  }

  onLoginFailure() {
    //display error message
  }

  render() {
    const {
      onLoginSuccess,
      onLoginFailure,
    } = this;

    const sidePanelProps = {
      onLoginSuccess,
      onLoginFailure,
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
