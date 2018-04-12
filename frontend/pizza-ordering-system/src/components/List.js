import React from 'react';
import _ from 'lodash';

const List = props => {
    const {
      id,
      Li, 
      items,
      bullet,
      selected,
      setSelect,
      ulClassName,
      liClassName,
      selectedClassName,
    } = props;

    return (
      items.length > 0 &&
      <ul className={ulClassName}
          style={{
            listStyleType: bullet ? null : 'none',
            paddingLeft: bullet ? 36 : 0,
            margin: bullet ? '12px 0' : 0,
          }} >
        {
          _.map(items, (item, ind) =>
            <li className={ 'align-left ' + 
                  (selected === ind ? selectedClassName : liClassName)
                }
                id={`${id}-${ind}`}
                onClick={setSelect.bind(null, ind)}
                key={`${id}-${ind}`} >
              <Li last={ind === items.length-1}
                  children={item} />
            </li>
          )
        }
      </ul>
    )
}

List.defaultProps = {
  id: '',
  Li: ({ children }) => <label children={children} />,
  items: [],
  bullet: false,
  selected: null,
  setSelect: () => null,
  ulClassName: '',
  liClassName: '',
  selectedClassName: '',
}

export default List;