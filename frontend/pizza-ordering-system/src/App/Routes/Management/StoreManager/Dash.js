import React, { Component } from 'react';

import {
  List,
  DropDown,
  PendingRequest,
  PendingOrder,
  EditStoreForm,
  HireForm,
  Feedback,
} from 'components';

import {
  withModal,
} from 'lib';

class Dash extends Component {
  constructor() {
    super();

    this.state = {
      store: sampleStore,
      menu: sampleMenu,
      cooks: sampleCooks,
      delivery: sampleDelivery,
      requests: sampleCooks,
      orders: sampleOrders,
      feedback: sampleFeedback,
      isMobile: window.innerWidth < 480,
    }
    console.log(this);

    this.onLogout = this.onLogout.bind(this);
    this.toggle = this.toggle.bind(this);
    this.checkIsMobile = this.checkIsMobile.bind(this);
  }

  componentDidMount() {
    const {
      addForm,
    } = this.props;

    window.addEventListener('resize', this.checkIsMobile);

    addForm(EDIT_STORE_FORM_NAME, EditStoreForm)
    addForm(HIRE_FORM_NAME, HireForm)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.checkIsMobile);
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

  onLogout() {

  }

  render() {
    const {
      onLogout,
    } = this;

    const {
      store,
      menu,
      cooks,
      delivery,
      requests,
      orders,
      feedback,
      isMobile,
    } = this.state;

    const {
      setForm,
    } = this.props;

    return (
      <div className='fill' >
        <div  className='align-left'>
          <button className='btn-md btn-pink float-right margin-sm'
                  onClick={onLogout} >
            Logout
          </button>
          <div className='margin-md fit'>
            <label className='font-xl font-bold'>{ store.name }</label>
          </div>
          <br />
          <div className='margin-md fit'>
            <label className='sm-font'>{ store.address }</label>
          </div>
          <br />
          <div className='align-right'>
            <button className='btn-md btn-transparent margin-sm'
                    onClick={setForm(EDIT_STORE_FORM_NAME)} >
              Edit Store
            </button>
            <button className='btn-md btn-transparent margin-sm'
                    onClick={setForm(HIRE_FORM_NAME)} >
              Hire Workers
            </button>
          </div>
        </div>

        <div className='line-h' />

        <div className='block-inline fade-in scrollable'
             style={{ height: 'calc(100vh - 120px)' }} >

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
                      <label className='padding-sm align-left fit font-darkpink'>
                        { props.children }
                      </label>
                } />
            </DropDown>

            <DropDown title='Cooks' >
              <List id='cooks'
                    items={cooks}
                    Li={props => 
                      <label className='padding-sm align-left fit font-darkblue'>
                        { props.children }
                      </label>
                } />
            </DropDown>

            <DropDown title='Delivery' >
              <List id='delivery'
                    items={delivery}
                    Li={props => 
                      <label className='padding-sm align-left fit font-darkblue'>
                        { props.children }
                      </label>
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
                    Li={PendingRequest} />
            </DropDown>

            <DropDown title='Pending Orders' >
              {
                orders.length > 0 &&
                <List id='orders'
                      items={orders}
                      Li={PendingOrder} />
              }
            </DropDown>

            <DropDown title='Customer Feedback' >
              {
                menu.length > 0 &&
                <List id='feedback'
                      items={feedback}
                      Li={Feedback} />
              }
            </DropDown>
            
          </div>
        </div>
      </div>
    )
  }
}

export default withModal(Dash);

const EDIT_STORE_FORM_NAME = 'edit_store';
const HIRE_FORM_NAME = 'hire';

const sampleMenu = [
  'pineapple pizza',
  'sausage pizza',
  'italian pizza',
  'plain pizza',
]

const sampleCooks = [
  'Alex',
  'Kenny',
  'Josh',
  'Alex',
  'Kenny',
  'Josh',
  'Alex',
  'Kenny',
  'Josh',
  'Alex',
  'Kenny',
  'Josh',
]

const sampleDelivery = [
  'Jenny',
  'Peter',
  'Sophia',
]

const sampleOrders = [
  {
    firstname: 'Meriselle',
    lastname: 'Ruotolo',
    pizzas: [
      'pineapple',
      'dusty',
      'marinara',
    ]
  },
  {
    firstname: 'John',
    lastname: 'Cena',
    pizzas: [
      'italian',
      'sausage',
    ]
  },
  {
    firstname: 'Francesca',
    lastname: 'Ruotolo',
    pizzas: [
      'pepperoni',
      'italian',
      'marinara',
    ]
  }
]

const sampleStore = {
  name: 'Dominos',
  address: '123 abc st',
  manager: 'John Connor',
}

const sampleFeedback = [
  {
    name: 'John',
    msg: 'the pepperoni pizza was delicious!',
    positive: true,
  },
  {
    name: 'Kenny',
    msg: 'the italian pizza was delicious!',
    positive: true,
  },
  {
    name: 'Alex',
    msg: 'the pineapple pizza was disgusting...',
    positive: false,
  },
]