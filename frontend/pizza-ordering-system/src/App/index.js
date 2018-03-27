import React, { Component } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import Home from './Routes/Home';
import Login from './Routes/Login';
import Signup from './Routes/Signup';
import SMLogin from './Routes/StoreManager/Login';
import SMSignup from './Routes/StoreManager/Signup';
import SMSetup from './Routes/StoreManager/Setup';
import SMDash from './Routes/StoreManager/Dash';

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

  componentWillMount() {
    this.time = Date.now();
    const {
      history,
    } = this.props;

    console.log(history.location);
  }

  componentDidMount() {
    console.log(Date.now() - this.time);
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
      redirectDest,
    } = this.state;

    return (
      <div
        style={{
          position: 'relative',
          minWidth: 400,
          width: '100vw',
          height: '100vh',
          fontSize: 12,  
          overflow: 'hidden',
        }} >

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
              path='/storemanager/login'
              component={SMLogin} />

            <Route 
              exact
              path='/storemanager/signup'
              component={SMSignup} />

            <Route 
              exact
              path='/storemanager/setup'
              component={SMSetup} />

            <Route 
              exact
              path='/storemanager/dash'
              component={SMDash} />

            <Route path='/home' component={Home} />       


          </Switch>

      </div>
    );
  }
}

export default withRouter(App);
