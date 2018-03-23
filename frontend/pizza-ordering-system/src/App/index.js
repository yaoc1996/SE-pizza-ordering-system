import React, { Component } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import Home from './Routes/Home';
import Login from './Routes/Login';
import Signup from './Routes/Signup';

import {
  AppView,
  MainView,
} from './styled';

class App extends Component {
  constructor() {
    super();

    this.state = {
      user: null,
      redirectDest: '/',
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
      redirect
    } = this;

    const {
      user,
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
                  { ...props } />
              } />
            <Route 
              exact
              path='/signup'
              render={props => 
                <Signup
                  setAppState={setAppState}
                  redirect={redirect}
                  { ...props } />
              } />
            <Route path='/home' component={Home} />            
          </Switch>

        </MainView>
      </AppView>
    );
  }
}

export default withRouter(App);
