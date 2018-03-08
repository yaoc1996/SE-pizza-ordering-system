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
  background: white;
  border-left: 1px solid #bbb;
  border-right: 1px solid white;
  text-align: left;
  transition: right .3s ease;
`;

const ToggleButton = styled.button`
  position: absolute;
  display: inline-block;
  width: 30px;
  height: 90px;
  margin-left: -30px;
  margin-top: calc(50vh - 90px);
  color: white;
  opacity: 0.7;
  border: 0;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  -webkit-transition: background .15s ease;
  -moz-transition: background .15s ease;
  -o-transition: background .15s ease;
  transition: background .15s ease;
  outline: none;

  :hover {
    opacity: 1;
    cursor: pointer;
  }

  :active {
    background: white;
    color: #bbb;
  }
`;

const MaterialIcon = styled.i.attrs({
  className: 'material-icons',
})`
  font-size: 36px;
  margin-left: -9px;
  line-height: 90px;
`

const LoginForm = styled.form`
  width: 100%;
  height: 100%;
`

const LoginLabel = styled.label`
  display: block;
  width: 100%;
  margin: 50px 0px;
  text-align: center;
  font-weight: 100;
  font-size: 36px;
  color: #555;
`

const FormField = styled.div`
  position: relative;
  width: calc(100% - 60px);
  height: 100px;
  padding: 0 30px;
`

const FieldLabel = styled.label`
  display: block;
  height: 50px;
  line-height: 50px;
  text-align: left;
  font-weight: 100;
  font-size: 12px;

`

const FieldInput = styled.input`
  height: 20px;
  width: 100%;
  border: 0;
  border-bottom: 1px solid #bbb;
  outline: none;

  :focus {
    border-bottom-color: black;
  }
`

const FieldSubmitButton = styled.button`
  display: block;
  float: right;
  width: 100px;
  height: 36px;
  background: white;
  border: 1px solid #bbb;
  border-top-left-radius: 18px;
  border-bottom-left-radius: 18px;
  font-weight: 200;
  margin-top: 20px;
  -webkit-transition:
    background .15s ease,
    color .15s ease,
    border .15s ease;
  -moz-transition:
    background .15s ease,
    color .15s ease,
    border .15s ease;
  -o-transition:
    background .15s ease,
    color .15s ease,
    border .15s ease;
  transition:
    background .15s ease,
    color .15s ease,
    border .15s ease;
    

  :hover {
    cursor: pointer;
    background: #999;
    color: black;
  }

  :active {
    border: 0;
    background: #333;
    color: white;
  }
`

export {
  PanelView,
  ToggleButton,
  MaterialIcon,
  LoginForm,
  LoginLabel,
  FormField,
  FieldLabel,
  FieldInput,
  FieldSubmitButton,
};