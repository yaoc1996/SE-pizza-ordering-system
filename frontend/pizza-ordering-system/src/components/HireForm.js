import React, { Component } from 'react';

import {
  Form,
  Label,
  FloatLButton,
  MarginBox,
  PaddingBox,
  HR,
  Input,
  Block,
  MaterialIcon,
  HVCenteredBox,
} from 'styled';
import List from './List';

class HireForm extends Component {
  constructor() {
    super();

    this.state = {
      selected: null,
      searches: sampleCooks,
    }

    this.setSelect = this.setSelect.bind(this);
  }

  setSelect(selected) {
    this.setState({
      selected,
    })
  }

  onOffer(e) {
    e.preventDefault();
    console.log(e.target);
  }

  render() {
    console.log('rendering HireForm');
    const {
      setSelect,
      onOffer,
    } = this;

    const {
      searches,
      selected,
    } = this.state;

    const {
      type,
    } = this.props;
    
    return (
      <HVCenteredBox style={{ borderRadius: 12 }} >
        <Form 
          onSubmit={onOffer}
          style={{ textAlign: 'left' }} >
          <MarginBox>
            <Label
              fontSize='14px'
              color='#455A64' >
              Search for { type[0].toUpperCase() + type.substr(1) }
            </Label>
          </MarginBox>
          <HR />
          <br />
          <div 
            style={{ 
              margin: 6,
              verticalAlign: 'top',
              display: 'inline-block',
            }}>
            <MaterialIcon>search</MaterialIcon>
          </div>
          <Input
            width='calc(100% - 96px)'
            placeholder='Enter a name' />
          <br /><br />
          
          <div
            style={{
              marginLeft: 54,
              border: searches.length > 0 && '1px solid rgba(0, 0, 0, 0.1)',
              width: 'calc(100% - 72px)',
            }} >
            <List
              name='search-results'
              className='no-animation'
              setSelect={setSelect}
              listStyleType='none'
              list={searches}
              ListItem={props => 
                <MarginBox>
                  <Label
                    color='#1976D2'
                    fontSize='12px' >{ props.children }</Label>
                </MarginBox>
              } />
          </div>
          <br />
          <Block>
            {
              selected !== null &&
              <PaddingBox>
                <FloatLButton
                  color='white'
                  hover='#388E3C'
                  active='#333'
                  background='#4CAF50'>Offer</FloatLButton>
                &nbsp;&nbsp;$
                <Input
                  type='number'
                  placeholder='Amount'
                  width='84px'
                  required
                  autoFocus />
                / hour
              </PaddingBox>
            }
          </Block>
        </Form>
      </HVCenteredBox>
    )
  }
}

export default HireForm;

const sampleCooks = [
  'Alex',
  'Kenny',
  'Josh',
]