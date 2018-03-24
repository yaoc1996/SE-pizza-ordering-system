import React, { Component } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import Home from './Routes/Home';
import Login from './Routes/Login';
import Signup from './Routes/Signup';
import SMLogin from './Routes/StoreManager/Login';
import SMSignup from './Routes/StoreManager/Signup';

import {
  AppView,
  MainView,
} from './styled';

class App extends Component {
  constructor() {
    super();

    this.state = {
      user: null,
      redirectDest: '/home',
    }

    this.setAppState = this.setAppState.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  componentDidMount() {

  }

  setAppState(state) {
    this.setState(state);
  }

  redirect() {
    this.props.history.push(this.state.redirectDest);
  }

  render() {
    const {
      setAppState,
      redirect,
    } = this;

    const {
      user,
      redirectDest,
    } = this.state;

    return (
      <AppView>
        <MainView>

          <Switch>

            <Route 
              exact
              path='/login'
              render={props => 
                <Login
                  setAppState={setAppState}
                  redirect={redirect}
                  redirectDest={redirectDest}
                  { ...props } />
              } />

            <Route 
              exact
              path='/signup'
              render={props => 
                <Signup
                  setAppState={setAppState}
                  redirect={redirect}
                  redirectDest={redirectDest}
                  { ...props } />
              } />

            <Route 
              exact
              path='/storemanager/signup'
              component={SMSignup} />

            <Route 
              exact
              path='/storemanager/login'
              component={SMLogin} />

            <Route path='/home' component={Home} />       


          </Switch>

        </MainView>
      </AppView>
    );
  }
}

export default withRouter(App);
