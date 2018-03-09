import styled from 'styled-components';

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
  margin-top: 20px;
  margin-right: 30px;
  background: white;
  border: 1px solid #bbb;
  border-top-left-radius: 18px;
  border-bottom-left-radius: 18px;
  font-weight: 200;
  clear: both;
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

const RedirectLabel = styled.label`
  display: block;
  position: relative;
  padding-top: 20px;
  margin-right: 30px;
  color: blue;
  font-size: 12px;
  font-weight: 100;
  text-align: right;
  clear: both;

  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`

export {
  LoginForm,
  LoginLabel,
  FormField,
  FieldLabel,
  FieldInput,
  FieldSubmitButton,
  RedirectLabel,
};