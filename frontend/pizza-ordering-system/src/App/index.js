import React, { Component } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import Home from './Routes/Home'
import Login from './Routes/Login';
import Signup from './Routes/Signup';
import MgmtLogin from './Routes/Management/Login';
import MgmtSignup from './Routes/Management/Signup';
import StoreSetup from './Routes/Management/Manager/Setup';
import Manager from './Routes/Management/Manager';
import Cook from './Routes/Management/Cook';
import Delivery from './Routes/Management/Delivery';
import Store from './Routes/Store';
import SCheckout from './Routes/Store/Checkout';

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
  }
  
  componentDidMount() {
    const token = localStorage.getItem('token')
    if (token) {
      getAuth(token)
        .then(json => {
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

  logout(dest) {
    this.setState({
      user: null,
    })
    localStorage.removeItem('token')
    this.setState({
      loading: true,
    })
    this.props.history.push(dest ? dest : '/home')
    window.location.reload()
  }

  render() {
    const {
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
                    path='/management/manager/setup'
                    component={StoreSetup} />
            <Route  exact

                    path='/management/manager'
                    render={props => 
                      <Manager  logout={this.logout}
                                { ...props } />
                    } />

            <Route  exact
                    path='/management/cook'
                    render={props =>
                      <Cook logout={this.logout}
                            { ...props } />
                    } />

            <Route  exact
                    path='/management/delivery'
                    render={props => 
                      <Delivery logout={this.logout}
                                { ...props } />
                    } />

            <Route  path='/home' 
                    render={props => 
                      <Home logout={this.logout}
                            setAppState={this.setAppState}
                            user={user}
                            { ...props } />
                    } />    

            <Route  path='/store/:storeId'
                    render={props => 
                      <Store  logout={this.logout}
                              user={user}
                              { ...props } />
                    }/>

            <Route  exact
                    path='/store/checkout'
                    component={SCheckout} />

          </Switch>

      </div>
    );
  }
}

export default withRouter(App);
