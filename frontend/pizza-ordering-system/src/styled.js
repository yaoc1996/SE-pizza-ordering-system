import styled from 'styled-components';

const HVCenteredBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const PageHeading = styled.h1`
  color: #ccc;
  font-size: 72px;
  margin: 36px 0;
`

const LogoLabel = styled.label`
  color: #333;
  font-size: 18px;
  font-weight: 700;
  margin: 12px 0;
`

const AppNameLabel = styled.label`
  display: block;
  color: #ddd;
  font-size: 12px;
  font-weight: 700;
  margin: 12px 0;  
`

const Form = styled.form`
  width: 80vw;
  min-width: 376px;
  max-width: 420px;
  margin: auto;
  margin-bottom: 36px;
`

const FormField = styled.div`
  position: relative;
  width: 100%;
  padding: 24px 0;
  
  :first-of-type {
    border-top: 1px solid #ddd;
    margin-top: 72px;
  }

  :last-of-type {
    margin-bottom: 36px;
    border-bottom: 1px solid #ddd;    
  }
`

const FFLabel = styled.label`
  display: inline-block;
  width: 72px;
  margin: 0 6px;
  margin-left: -72px;  
  color: #777;
  font-weight: 700;
  text-align: right;
`

const FFInput = styled.input`
  width: 192px;
  height: 24px;
  border: 1px solid #ccc;
  padding: 4px 6px;
  outline: none;  

  :focus {
    border: 2px solid #0288D1;
    height: 22px;
  }
`

const FormButton = styled.button`
  padding: 12px 24px;
  color: #0277BD;
  background: #E3F2FD;
  border: 0;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 700;
  outline: none;

  :hover {
    background: #64B5F6;
  }

  :active {
    color: white;
  }
`

const FloatRButton = FormButton.extend`
  float: right;
  color: #455A64;
  background: #CFD8DC;
  margin: 6px 6px 0 0;

  :hover {
    background: #90A4AE;
  }
`

const FloatLButton = FloatRButton.extend`
  float: left;
  margin: 6px 0 0 6px;
`

const ClickableLabel = styled.label`
  display: block;
  color: #90A4AE;
  font-weight: 700;
  
  :hover {
    text-decoration: underline;
    cursor: pointer;
  }

  :active {
    color: #455A64;
  }
`

export {
  HVCenteredBox,
  PageHeading,
  LogoLabel,
  AppNameLabel,
  Form,
  FormField,
  FFLabel,
  FFInput,
  FormButton,
  FloatLButton,
  FloatRButton,
  ClickableLabel,
}