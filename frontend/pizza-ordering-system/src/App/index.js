import React, { Component } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import Home from './Routes/Home'
import Login from './Routes/Login';
import Signup from './Routes/Signup';
import MgmtLogin from './Routes/Management/Login';
import MgmtSignup from './Routes/Management/Signup';
import StoreSetup from './Routes/Management/StoreManager/Setup';
import Manager from './Routes/Management/StoreManager/Dash';
import Cook from './Routes/Management/Cook/Dash';
import Delivery from './Routes/Management/Delivery';
import SSID from './Routes/Management/Store/StoreID';
import SCheckout from './Routes/Management/Store/Checkout';

import {
  getAuth,
  postLogin,
  postSignup,
  postMgmtLogin,
} from 'lib';

class App extends Component {
  constructor() {
    super();

    this.state = {
      user: null,
      redirectDest: '/home',
      loading: true,
    }

    this.setAppState = this.setAppState.bind(this);
    this.redirect = this.redirect.bind(this);
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.mgmtLogin = this.mgmtLogin.bind(this);
    this.mgmtSignup = this.mgmtSignup.bind(this);
    this.logout = this.logout.bind(this);
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
    const token = localStorage.getItem('token')
    if (token) {
      getAuth(token)
        .then(json => {
          console.log(json)
          if (json && json.success) {
            this.setState({
              user: json.user,
            })
          }
  
          this.setState({
            loading: false,
          })
        })
    } else {
      this.setState({
        loading: false,
      })
    }
  }

  setAppState(state) {
    this.setState(state);
  }

  redirect() {
    this.props.history.push(this.state.redirectDest);
  }

  login(e) {
    e.preventDefault();
    
    const email = e.target.email.value;
    const password = e.target.password.value;

    postLogin({
      email,
      password,
    })
    .then(json => {
      console.log(json)
      if (json && json.success) {
        localStorage.setItem('token', json.token);
        this.setState({
          user: json.user
        })
        this.redirect();
      } else {
        json && alert(json.message);
        window.location.reload();
      }
    })
  }

  signup(e) {
    e.preventDefault();

    const firstname = e.target.firstname.value;
    const lastname = e.target.lastname.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    postSignup({
      firstname,
      lastname,
      email,
      password,
      type: 'customer',
    })
      .then(json => {
        console.log(json);
        if (json && json.success) {
          localStorage.setItem('token', json.token);
          this.setState({
            user: json.user,
          })

          this.redirect();
        } else {
          json && alert(json.message);
          window.location.reload();
        }
      })
  }

  mgmtLogin(e) {
    e.preventDefault();
    
    const email = e.target.email.value;
    const password = e.target.password.value;

    postMgmtLogin({
      email,
      password,
    })
    .then(json => {
      console.log(json)
      if (json && json.success) {
        localStorage.setItem('token', json.token);
        this.setState({
          user: json.user
        })
        
        this.props.history.push('/management/'+json.user.type)
      } else {
        json && alert(json.message);
        window.location.reload();
      }
    })
  }

  mgmtSignup(e) {
    e.preventDefault();

    const firstname = e.target.firstname.value;
    const lastname = e.target.lastname.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const type = e.target.type.value;

    postSignup({
      firstname,
      lastname,
      email,
      password,
      type,
    })
      .then(json => {
        console.log(json);
        if (json && json.success) {
          localStorage.setItem('token', json.token);
          this.setState({
            user: json.user,
          })

          this.props.history.push('/management/'+json.user.type)          
        } else {
          json && alert(json.message);          
          window.location.reload();
        }
      })
  }

  logout() {
    this.setState({
      user: null,
    })
    localStorage.removeItem('token')
    this.setState({
      loading: true,
    })
    window.location.reload()
  }

  render() {
    const {
      setAppState,
      redirect,
    } = this;

    const {
      loading,
      redirectDest,
      user,
    } = this.state;

    return (
      !loading &&
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
                      <Login  login={this.login}
                              redirectDest={redirectDest}
                              redirect={redirect}
                              { ...props } />
                    } />

            <Route  exact
                    path='/signup'
                    render={props => 
                      <Signup signup={this.signup}
                              redirectDest={redirectDest}
                              { ...props } />
                    } />

            <Route  exact
                    path='/management/login'
                    render={props => 
                      <MgmtLogin  login={this.mgmtLogin}
                                  { ...props } />
                    } />

            <Route  exact
                    path='/management/signup'
                    render={props =>
                      <MgmtSignup signup={this.mgmtSignup}
                                  { ...props } />
                    } />

            <Route  exact
                    path='/management/storemanager/setup'
                    component={StoreSetup} />
            <Route  exact

                    path='/management/storemanager/dash'
                    component={Manager} />

            <Route  exact
                    path='/management/cook/dash'
                    component={Cook} />

            <Route  exact
                    path='/management/delivery'
                    component={Delivery} />

            <Route  path='/home' 
                    render={props => 
                      <Home logout={this.logout}
                            user={user}
                            { ...props } />
                    } />    

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
