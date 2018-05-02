import React, { Component } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import Home from './Routes/Home';
import Login from './Routes/Login';
import Signup from './Routes/Signup';
import SMLogin from './Routes/Management/Login';
import SMSignup from './Routes/Management/Signup';
import SMSetup from './Routes/Management/StoreManager/Setup';
import SMDash from './Routes/Management/StoreManager/Dash';
import CKDash from './Routes/Management/Cook/Dash';
<<<<<<< HEAD
import SSID from './Routes/Management/Store/StoreID';
import SCheckout from './Routes/Management/Store/Checkout';
=======
import Delivery from './Routes/Management/Delivery';
>>>>>>> added delivery person homepage

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
          minHeight: 720,
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
        }} >

          <Switch>

            <Route  exact
                    path='/login'
                    render={props => 
                      <Login  setAppState={setAppState}
                              redirect={redirect}
                              redirectDest={redirectDest}
                              { ...props } />
                    } />

            <Route  exact
                    path='/signup'
                    render={props => 
                      <Signup
                        setAppState={setAppState}
                        redirect={redirect}
                        redirectDest={redirectDest}
                        { ...props } />
                    } />

            <Route  exact
                    path='/management/login'
                    component={SMLogin} />

            <Route  exact
                    path='/management/signup'
                    component={SMSignup} />

            <Route  exact
                    path='/management/storemanager/setup'
                    component={SMSetup} />

            <Route  exact
                    path='/management/storemanager/dash'
                    component={SMDash} />

            <Route  exact
                    path='/management/cook/dash'
                    component={CKDash} />

            <Route  exact
                    path='/management/delivery'
                    component={Delivery} />

            <Route  path='/home' 
                    component={Home} />    

            
            <Route  exact
                    path='/management/store/storeid'
                    component={SSID} />

            <Route  exact
                    path='/management/store/checkout'
                    component={SCheckout} />

          </Switch>

      </div>
    );
  }
}

export default withRouter(App);
