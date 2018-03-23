import styled from 'styled-components';

const HVCenteredBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
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
`

const FormField = styled.div`
  position: relative;
  width: 100%;
  padding: 36px 0;
  
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
}