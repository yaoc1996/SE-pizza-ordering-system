import styled from 'styled-components';

const HVCenteredBox = styled.div`
  z-index: 999;
  position: absolute;
  top: 50%;
  left: 50%;
  background: white;  
  transform: translate(-50%, -50%);
`

const PageHeading = styled.h1.attrs({
  style: ({ color }) => ({
    color: color || '#ccc',
  })
})`
  font-size: 72px;
  margin: 36px 0;
`

const Label = styled.label.attrs({
  style: ({ fontSize, color }) => ({
    fontSize: fontSize || 18,
    color: color || '#333',
  })
})`
  height: 14px;
  font-weight: 700;
  vertical-align: top;
`

const Form = styled.form`
  width: 80vw;
  min-width: 376px;
  max-width: 424px;
  margin: auto;
`

const FormField = styled.div`
  position: relative;
  width: 100%;
  padding: 24px 0;
  
  :first-of-type {
    border-top: 1px solid #ddd;
    margin-top: 36px;
  }

  :last-of-type {
    margin-bottom: 36px;
    border-bottom: 1px solid #ddd;    
  }
`

const FFLabel = styled.label`
  display: inline-block;
  width: 144px;
  margin: 0 6px;
  margin-left: -144px;  
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
    border: 3px solid #aaa;
    height: 20px;
  }
`

const FFTextarea = styled.textarea`
  width: 192px;
  height: 96px;
  border: 1px solid #ccc;
  padding: 4px 6px;
  outline: none;
  resize: none;

  :focus {
    border: 3px solid #aaa;
    height: 92px;
  }
`

const FormButton = styled.button`
  position: relative;
  padding: 0px 12px;
  height: 36px;
  border: 0;
  border-radius: 6px;
  font-weight: 700;
  outline: none;
  ${({ color, background, hover, active, fontSize, width, height }) => `
    font-size: ${fontSize || '12px'};
    height: ${height || '36px'};
    color: ${color};
    background: ${background};

    :hover {
      background: ${hover};
      cursor: pointer;
    }

    :active {
      color: ${active}
    }
  `}
`

const FloatRButton = FormButton.extend`
  float: right;
  margin: 6px;
`

const FloatLButton = FloatRButton.extend`
  float: left;
`

const ClickableLabel = styled.label`
  color: #1976D2;
  font-weight: 600;
  font-size: 12;
  
  :hover {
    cursor: pointer;
    color: #42A5F5;
  }

  :active {
    color: #0D47A1;
  }
`

const DashHeader = styled.div`
  position: relative;
  width: 100%;
  text-align: left;
`

const InlineBlock = styled.div.attrs({
  style: ({ width, height, background }) => ({
    width: width || '100%',
    height: height || 'auto',
    background: background || 'transparent',
  })
})`
  display: inline-block;
  position: relative;
  margin: 0;
  text-align: left;
  vertical-align: top;
  overflow-y: auto;
  overflow-x: hidden;
`

const Block = InlineBlock.extend`
  display: block;
  overflow: hidden;
`

const MaterialIcon = styled.i.attrs({
  className: 'material-icons no-select',
})`
  display: inline-block;
  font-size: 32px;
  width: 36px;
  height: 36px;
  line-height: 42px;
  margin: auto;
  color: #90A4AE;
  font-weight: 700;
  text-align: center;

  :hover {
    cursor: pointer;
  }
`

const ListBox = styled.div.attrs({
  style: ({ last, background }) => ({
    borderBottom: !last && '1px solid rgba(0, 0, 0, 0.05',
    background: background || 'transparent',
  })
})`
  position: relative;
  width: calc(100% - 24px);
  padding: 6px 12px;
`

const PaddingBox = styled.div`
  display: inline-block;
  width: auto;
  padding: 6px 12px;
  vertical-align: top;
`

const MarginBox = styled.div`
  display: inline-block;
  width: auto;
  margin: 12px 24px;
  vertical-align: top;  
`

const HR = styled.div`
  z-index: 9999;
  display: block;
  width: 100%;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  margin: 0;
  vertical-align: top;
`

const VR = styled.div`
  z-index: 9999;
  display: inline-block;
  height: 100%;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  margin: 0;
  vertical-align: top;
`

const Input = styled.input.attrs({
  style: ({ width, height, color, border }) => ({
    width: width || 'calc(100% - 38px)',
    height: height || '30px',
    color: color || '#333',
  })
})`
  margin: 6px;
  background: white;
  color: #455A64;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 600;
  outline: none;
  border: 1px solid rgba(0, 0, 0, 0.1);

  :focus {
    border: 1px solid ${({ color }) => color || '#aaa'};
  }

  ::placeholder {
    color: #bbb;
    font-weight: 500;
  }
`

export {
  HVCenteredBox,
  PageHeading,
  Label,
  Form,
  FormField,
  FFLabel,
  FFInput,
  FFTextarea,
  FormButton,
  FloatLButton,
  FloatRButton,
  ClickableLabel,
  DashHeader,
  InlineBlock,
  Block,
  MaterialIcon,
  ListBox,
  PaddingBox,
  MarginBox,
  HR,
  VR,
  Input,
}