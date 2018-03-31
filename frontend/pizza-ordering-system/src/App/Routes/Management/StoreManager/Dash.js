import React, { Fragment, Component } from 'react';

import {
  Label,
  DashHeader,
  FloatRButton,
  FloatLButton,
  InlineBlock,
  PaddingBox,
  VR,
  HR,
} from 'styled';

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

    this.logout = this.logout.bind(this);
    this.toggle = this.toggle.bind(this);
    this.checkIsMobile = this.checkIsMobile.bind(this);
  }

  componentDidMount() {
    const {
      addForm,
    } = this.props;

    window.addEventListener('resize', this.checkIsMobile);

    addForm('edit_store', EditStoreForm)
    addForm('hire_cooks', props => 
      <HireForm
        type='cooks'
        { ...props } />
    )
    addForm('hire_delivery', props => 
      <HireForm
        type='delivery workers'
        { ...props } />
    )
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

  logout() {

  }

  render() {
    console.log('rendering Dash');
    
    const {
      logout,
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
      <Fragment>
        <FloatRButton
          color='white'
          background='#EC407A'
          hover='#F48FB1'
          active='#333' 
          onClick={logout} >Log Out</FloatRButton>
        <DashHeader>
          <PaddingBox>
            <Label
              color='#111'
              fontSize={24} >{ store.name }</Label>
          </PaddingBox>
          <br />
          <PaddingBox>
            <Label
              color='#bbb'
              fontSize={12} >{ store.address }</Label>
          </PaddingBox>
          <br /><br />
          <FloatLButton
            onClick={setForm('edit_store')}
            color='#455A64'
            hover='#eee'
            active='#1E88E5'
            background='transparent' >Edit Store</FloatLButton>            
          <FloatLButton
            onClick={setForm('hire_cooks')}
            color='#455A64'
            hover='#eee'
            active='#1E88E5'
            background='transparent' >Hire Cooks</FloatLButton>  
          <FloatLButton
            onClick={setForm('hire_delivery')}
            color='#455A64'
            hover='#eee'
            active='#1E88E5'
            background='transparent' >Hire Delivery Workers</FloatLButton>
        </DashHeader>
        <InlineBlock
          background='#f7f7f7'
          height='calc(100vh - 120px)' >
          <InlineBlock
            width={ isMobile ? '100%' : '239px' }
            height={ isMobile ? 'auto' : '100%' } >

            <DropDown
              title='Menu' >
              {
                menu.length > 0 &&
                <List
                  name='menu'
                  list={menu}
                  ListItem={props => 
                    <PaddingBox>
                      <Label
                        fontSize={12}
                        color='#C2185B'                      
                        { ...props } />
                    </PaddingBox>
                  } />
              }
            </DropDown>

            <DropDown
              title='Cooks' >
              {
                cooks.length > 0 &&
                <List
                  name='cooks'
                  list={cooks}
                  ListItem={props => 
                    <PaddingBox>
                      <Label
                        fontSize={12}
                        color='#1976D2'                      
                        { ...props } />
                    </PaddingBox>
                  } />
              }
            </DropDown>

            <DropDown
              title='Delivery' >
              {
                delivery.length > 0 &&
                <List
                  name='delivery'
                  list={delivery}
                  ListItem={props => 
                    <PaddingBox>
                      <Label
                        fontSize={12}
                        color='#1976D2'                      
                        { ...props } />
                    </PaddingBox>
                  } />
              }
            </DropDown>
            <HR />
          </InlineBlock>

          { !isMobile && <VR /> }

          <InlineBlock
            height={ isMobile ? 'auto' : '100%' }            
            width={ isMobile ? '100%' : 'calc(100% - 240px)' } >
            
            <DropDown
              title='Pending Requests' >
              {
                requests.length > 0 &&
                <List
                  name='requests'
                  list={requests}
                  listStyleType='none'
                  ListItem={PendingRequest} />
              }
            </DropDown>

            <DropDown
              title='Pending Orders' >
              {
                orders.length > 0 &&
                <List
                  name='orders'
                  list={orders}
                  listStyleType='none'
                  ListItem={PendingOrder} />
              }
            </DropDown>

            <DropDown
              title='Customer Feedback' >
              {
                menu.length > 0 &&
                <List
                  name='feedback'
                  list={feedback}
                  listStyleType='none'
                  ListItem={Feedback} />
              }
            </DropDown>
            
            <HR />
          </InlineBlock>
        </InlineBlock>
      </Fragment>
    )
  }
}

export default withModal(Dash);

const sampleMenu = [
  'pineapple pizza',
  'sausage pizza',
  'italian pizza',
  'plain pizza',
  'pineapple pizza',
  'sausage pizza',
  'italian pizza',
  'plain pizza',
  'pineapple pizza',
  'sausage pizza',
  'italian pizza',
  'plain pizza',
]

const sampleCooks = [
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