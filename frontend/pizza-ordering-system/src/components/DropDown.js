import React, { Component } from 'react';

class DropDown extends Component {
  constructor({ collapsed }) {
    super();

    this.state = {
      collapsed,
    }

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(({ collapsed }) => ({
      collapsed: !collapsed,
    }))
  }

  render() {
    const { toggle } = this;
    const { collapsed } = this.state;
    const {
      title,
      children,
      labelCN,
    } = this.props;

    return (
      <div className='block' >
        <div className='block align-left clickable'
             style={{ backgroundColor: '#eee'}}
             onClick={toggle} >
          <i className='material-icons float-right no-selection' 
             style={{ transform: collapsed ? null : 'rotate(-180deg)' }} >
            arrow_drop_up
          </i>
          <label className={'margin-lg fit font-bold ' + labelCN}>
            { title }
          </label>
        </div>
        { !collapsed && children }
      </div>
    )
  }
}

export default DropDown;

DropDown.defaultProps = {
  title: 'DropDown',
  collapsed: false,
  labelCN: '',
}