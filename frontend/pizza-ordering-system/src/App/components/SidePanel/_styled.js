import styled from 'styled-components';

const PanelView = styled.div.attrs({
  style: ({ collapsed }) => ({
    right: collapsed ? -298 : 0,
  }),
})`
  z-index: 999;
  position: absolute;
  top: 0;
  width: 300px;
  height: 100%;
  background-color: #E91E63;
  border-right: 1px solid #E91E63;
  text-align: left;
  transition: right .3s ease;
`;

const ToggleButton = styled.button`
  position: relative;
  display: inline-block;
  width: 30px;
  height: 90px;
  margin-left: -30px;
  margin-top: calc(50vh - 90px);
  color: white;
  background: rgba(233, 30, 99, 0.5);
  border: 0;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  -webkit-transition: background .15s ease;
  -moz-transition: background .15s ease;
  -o-transition: background .15s ease;
  transition: background .15s ease;
  outline: none;

  :hover {
    background: rgba(233, 30, 99, 0.7);
    cursor: pointer;
  }

  :active {
    background: #E91E63;
  }
`;

const MaterialIcon = styled.i.attrs({
  className: 'material-icons',
})`
  font-size: 36px;
  margin-left: -9px;
  line-height: 90px;
`

export {
  PanelView,
  ToggleButton,
  MaterialIcon,
};