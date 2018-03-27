import React, { Component } from 'react';
import _ from 'lodash';

import {
  Label,
} from 'styled';

class List extends Component {
  constructor() {
    super();

    this.state = {
      selected: null,
    }

    this.select = this.select.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.list !== this.props.list;
  }

  select(id) {
    return () => {
      const { selected } = this.state;
      const { 
        setSelect,
        name,
      } = this.props;

      if (setSelect) {
        if (selected !== null) {
          const prev = document.getElementById(`${name}-${selected}`)
          prev.style.background = 'transparent';
        }
  
        const next = document.getElementById(`${name}-${id}`)      
        next.style.background = '#E3F2FD';
  
        this.setState({
          selected: id,
        })
  
        setSelect(id);
      }
    }
  }

  render() {
    console.log('rendering List');    
    const { select } = this;
    const {
      name,
      list,
      listStyleType, 
      ListItem, 
      inline,
    } = this.props;

    return (
      <ul
        style={{
          listStyleType,
          paddingLeft: listStyleType !== 'none' ? 40 : 0,
          margin: listStyleType !== 'none' ? '12px 0' : 0,
        }} >
        {
          _.map(list, (item, id) =>
            <li
              id={`${name}-${id}`}
              onClick={select(id)}
              key={id}
              style={{
                display: inline ? 'inline' : 'list-item',
                background: 'transparent',
              }} >
              <ListItem 
                last={id === list.length-1}
                children={item} />
            </li>
          )
        }
      </ul>
    )
  }
}

List.defaultProps = {
  name: '',
  list: [],
  color: '#333',
  fonSize: '12px',
  listStyleType: 'initial',
  ListItem: Label,
  inline: false,
}

export default List;