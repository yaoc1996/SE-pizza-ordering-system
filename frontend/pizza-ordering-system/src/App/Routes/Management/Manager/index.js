import React, { Component } from 'react';

import {
  List,
  DropDown,
  PendingRequest,
  PendingOrder,
  Feedback,
} from 'components';

import {
  postDeliveryTask,
  getManagerStore,
  withModal,
  putHandleRequest,
  postSalary,
} from 'lib';

class Manager extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      store: null,
      menu: [],
      cooks: [],
      delivery: [],
      requests: [],
      orders: [],
      ratings: [],
      salaries: {},
      isMobile: window.innerWidth < 480,
    }

    this.toggle = this.toggle.bind(this);
    this.checkIsMobile = this.checkIsMobile.bind(this);
    this.handleRequest = this.handleRequest.bind(this);
    this.getStore = this.getStore.bind(this);
    this.assignTask = this.assignTask.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.checkIsMobile);

    this.getStore();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.checkIsMobile);
  }

  getStore() {
    const token = localStorage.getItem('token');
    if (token) {
      getManagerStore(token)
        .then(json => {
          if (json && json.success) {
            if (json.store) {
              var salaries = {}

              json.delivery.forEach(x => salaries[x.id] = x.salary.amount)
              json.cooks.forEach(x => salaries[x.id] = x.salary.amount)

              this.setState({
                store: json.store,
                menu: json.menu,
                cooks: json.cooks,
                delivery: json.delivery,
                requests: json.requests,
                orders: json.orders,
                ratings: json.ratings,
                loading: false,
                salaries,
              })

            } else {
              this.props.history.push('/management/manager/setup')
            }
          } else {
            alert('error while getting store information')
            this.props.history.push('/home')
          }
        })
    } else {
      alert('unauthorized');
      this.props.history.push('/home');
    }
  }

  checkIsMobile() {
    if (window.innerWidth > 480 && this.state.isMobile) {
      this.setState({ isMobile: false });
    }

    if (window.innerWidth < 480 && !this.state.isMobile) {
      this.setState({ isMobile: true });
    }
  }

  toggle(target) {
    return () => {
      this.setState(state => ({
        [target]: !state[target],
      }))
    }
  }

  handleRequest(decision, customerId) {
    return () => {
      const token = localStorage.getItem('token')
      
      if (token) {
        putHandleRequest(token, decision, {
          customerId,
        })
          .then(json => {
            if (json && json.success) {
              this.getStore();
            }
          })
      } else {
        alert('invalid token -> user');
      }
    }
  }

  assignTask(id) {
    return e => {
      e.preventDefault();
  
      const token = localStorage.getItem('token')
  
      if (token) {
        postDeliveryTask(token, {
          deliveryId: e.target.delivery.value,
          id,
        })
          .then(json => {
            if (json && json.success) {
              this.getStore();
            } else {
              json && alert(json.message);
            }
          })
      } else {
        this.props.history.push('/home');
      }
    }
  }

  changeSalary(id) {
    return e => {
      const token = localStorage.getItem('token');
      const salary = e.target.value;

      if (token) {
        if (salary > 0) {
          postSalary(token, {
            id,
            amount: salary
          })
            .then(json => {
              if (json && json.success) {
                this.getStore();
              } else {
                json && alert(json.message);
              }
            })
        }
      } else {
        this.props.history.push('/home');
      }
    }
  }

  render() {
    const {
      loading,
      store,
      menu,
      cooks,
      delivery,
      requests,
      orders,
      ratings,
      isMobile,
    } = this.state;

    return (
      !loading &&
      <div className='fill' >
        <div  className='align-left'>
          <button className='btn-md btn-pink float-right margin-sm'
                  onClick={() => {
                    localStorage.removeItem('token');
                    this.props.setAppState({
                      type: '',
                      user: null,
                    }, () => {
                      this.props.history.push('/management/login')
                    })
                  }} >
            Logout
          </button>
          <div className='margin-md fit'>
            <label className='font-xl font-bold'>{ store.name }</label>
          </div>
          <div className='margin-md fit'>
            <label className='sm-font font-lightgrey'>{ store.address }</label>
          </div>
          <div className='margin-md fit'>
            <label className='sm-font font-grey'>Store ID: { store.id }</label>
          </div>
          <br />
        </div>

        <div className='line-h' />

        <div className='block-inline fade-in scrollable'
             style={{ height: 'calc(100vh - 64px)' }} >

          <div className='block-inline scrollable'
               style={{
                 width: isMobile ? '100%' : 239,
                 height: isMobile ? 'auto' : '100%',
               }} >

            <DropDown title='Menu' >
              <List id='menu-list'
                    items={menu}
                    bullet
                    Li={props => 
                      <div>
                      <label className='padding-sm align-left fit font-darkpink'>
                        { props.children.name }
                      </label>
                      <label className='padding-sm align-right float-right fit font-darkpink'>
                        ${ props.children.price }
                      </label>
                      </div>
                } />
            </DropDown>

            <DropDown title='Cooks' >
              <List id='cooks'
                    items={cooks}
                    Li={props => {
                      return (
                        <div>
                          <label className='margin-0 align-left align-middle fit font-darkblue'
                                  style={{
                                    padding: '12px 6px',
                                  }} >{ props.children.firstname } { props.children.lastname }</label>
                          <input  className='float-right font-darkblue align-right margin-md' 
                                  type='number'
                                  onBlur={this.changeSalary(props.children.id)}
                                  style={{
                                    width: 60,
                                  }} />
                          <label className='margin-0 float-right align-middle'
                                  style={{
                                    paddingTop: 12,
                                  }} >${ props.children.salary.amount}</label>
                        </div>
                      )
                    }
                } />
            </DropDown>

            <DropDown title='Delivery' >
              <List id='delivery'
                    items={delivery}
                    Li={props => 
                      <div>
                        <label className='margin-0 align-left align-middle fit font-darkblue'
                                style={{
                                  padding: '12px 6px',
                                }} >{ props.children.firstname } { props.children.lastname }</label>
                        <input  className='float-right font-darkblue align-right margin-md' 
                                type='number'
                                onBlur={this.changeSalary(props.children.id)}
                                style={{
                                  width: 60,
                                }} />
                        <label className='margin-0 float-right align-middle'
                                style={{
                                  paddingTop: 12,
                                }} >${ props.children.salary.amount}</label>
                      </div>
                } />
            </DropDown>
          </div>

          { !isMobile && <div className='line-v' /> }

          <div className='block-inline scrollable'
               style={{
                 height: isMobile ? 'auto' : '100%',         
                 width: isMobile ? '100%' : 'calc(100% - 240px)',
                }} >
            
            <DropDown title='Pending Requests' >
              <List id='requests'
                    items={requests}
                    Li={props => 
                      <PendingRequest handleRequest={this.handleRequest}
                                      { ...props } />
                    } />
            </DropDown>

            <DropDown title='Pending Orders' >
              {
                orders.length > 0 &&
                <List id='orders'
                      items={orders}
                      Li={props => 
                        <PendingOrder delivery={this.state.delivery} 
                                      assignTask={this.assignTask}
                                      { ...props } />
                      } />
              }
            </DropDown>

            <DropDown title='Customer Feedback' >
              {
                menu.length > 0 &&
                <List id='ratings'
                      items={ratings}
                      Li={Feedback} />
              }
            </DropDown>
            
          </div>
        </div>
      </div>
    )
  }
}

export default withModal(Manager);
