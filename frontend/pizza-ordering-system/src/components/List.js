import React from 'react';
import _ from 'lodash';

import {
  Label,
} from 'styled';

const List = ({ list, color, fontSize, listStyleType, Component }) =>
  <ul
    style={{
      listStyleType,
      paddingLeft: listStyleType === 'none' ? 0 : 40,
      margin: listStyleType === 'none' ? 0 : '12px 0',
    }} >
    {
      _.map(list, (item, id) =>
        <li key={id} >
          <Component children={item} />
        </li>
      )
    }
  </ul>

List.defaultProps = {
  color: '#333',
  fontSize: 12,
  Component: Label,
}

export default List;