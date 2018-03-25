import React, { Fragment, Component } from 'react';
import _ from 'lodash';

import {
  Label,
  DashHeader,
  FloatRButton,
  InlineCell,
  DropDownIcon,
} from 'styled';

import {
  List,
  DropDown,
  PendingRequest,
} from 'components';

class Dash extends Component {
  constructor() {
    super();
    this.state = {
      menu: sampleMenu,
      cooks: sampleCooks,
      delivery: sampleDelivery,
      requests: sampleMenu,
    }

    this.logout = this.logout.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  logout() {

  }

  toggle(target) {
    return () => {
      this.setState(state => ({
        [target]: !state[target],
      }))
    }
  }

  render() {
    const {
      logout,
    } = this;

    const {
      menu,
      cooks,
      delivery,
      requests
    } = this.state;

    return (
      <Fragment>
        <FloatRButton
          color='#455A64'
          background='#CFD8DC'
          hover='#90A4AE'
          active='white' 
          onClick={logout} >Log Out</FloatRButton>
        <DashHeader>
          <Label
            style={{ 
              alignSelf: 'flex-end',
              color: '#bbb'
            }} >John Connor</Label>
          <Label
            style={{ 
              alignSelf: 'flex-end',
              color: '#777',
              fontSize: 12,
            }} >Store Management</Label>
        </DashHeader>
        <InlineCell
          height='calc(100% - 114px)'
          top >
          <InlineCell
            background='#f9f9f9'
            width='240px'
            height='100%'
            right >

            <DropDown
              name='Menu' >
              {
                menu.length > 0 &&
                <List
                  list={menu}
                  Component={props => 
                    <Label
                      fontSize={12}
                      color='#C2185B'                      
                      { ...props } />
                  } />
              }
            </DropDown>

            <DropDown
              name='Cooks' >
              {
                cooks.length > 0 &&
                <List
                  list={cooks}
                  Component={props => 
                    <Label
                      fontSize={12}
                      color='#1976D2'                      
                      { ...props } />
                  } />
              }
            </DropDown>

            <DropDown
              bottom={false}
              name='Delivery' >
              {
                delivery.length > 0 &&
                <List
                  list={delivery}
                  Component={props => 
                    <Label
                      fontSize={12}
                      color='#1976D2'                      
                      { ...props } />
                  } />
              }
            </DropDown>

          </InlineCell>

          <InlineCell
            background='#f9f9f9'
            height='100%'
            width='calc(100% - 240px)' >

            <DropDown
              bottom={false}
              name='Pending Requests' >
              {
                requests.length > 0 &&
                <List
                  list={delivery}
                  listStyleType='none'
                  Component={PendingRequest} />
              }
            </DropDown>

          </InlineCell>
        </InlineCell>
      </Fragment>
    )
  }
}

export default Dash;

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
]

const sampleDelivery = [
  'Jenny',
  'Peter',
  'Sophia',
]