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

const Label = styled.label.attrs({
  style: ({ fontSize, color }) => ({
    fontSize: fontSize || 18,
    color: color || '#333'
  })
})`
  display: block;
  height: 14px;
  font-weight: 700;
  margin: 12px 18px;
  vertical-align: top;
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
    border: 3px solid #0288D1;
    height: 20px;
  }
`

const FormButton = styled.button`
  padding: 0px 12px;
  height: 36px;
  border: 0;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 700;
  outline: none;
  ${({ color, background, hover, active, fontSize, width, height }) => `
    font-size: ${fontSize || '12px'};
    height: ${height || '36px'};
    color: ${color};
    background: ${background};

    :hover {
      background: ${hover};
    }

    :active {
      color: ${active}
    }
  `}
`

const FloatRButton = FormButton.extend`
  float: right;
  margin: 6px 6px 0 0;
`

const FloatLButton = FloatRButton.extend`
  float: left;
  margin: 6px 0 0 6px;
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
  display: flex;
  width: 100%;
  height: 72px;
  text-align: left;
`

const InlineCell = styled.div.attrs({
  style: ({ width, height, top, left, right, bottom, background }) => {
    const hOffset = 0 + left || 0 + right || 0;
    const vOffset = 0 + top || 0 + bottom || 0;
    width = width || '100%';
    height = height || 'auto';

    return {
      width: `calc(${width} - ${hOffset}px)`,
      height: `calc(${height} - ${vOffset}px)`,
      borderTop: top && '1px solid #dfdfdf',
      borderLeft: left && '1px solid #dfdfdf',
      borderRight: right && '1px solid #dfdfdf',
      borderBottom: bottom && '1px solid #dfdfdf',
      background: background || 'transparent',
    }
  }
})`
  display: inline-table;
  position: relative;
  text-align: left;
  vertical-align: top;
  overflow-y: auto;
  overflow-x: hidden;
`

const DropDownIcon = styled.i.attrs({
  className: 'material-icons',
})`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 32px;
  width: 37px;
  height: 37px;
  line-height: 42px;
  margin: auto;
  color: #90A4AE;
  font-weight: 700;
  text-align: center;

  :hover {
    cursor: pointer;
  }
`

const RequestBox = styled.div`
  width: calc(100% - 24px);
  height: 100%;
  padding: 6px 12px;
`

export {
  HVCenteredBox,
  PageHeading,
  Label,
  Form,
  FormField,
  FFLabel,
  FFInput,
  FormButton,
  FloatLButton,
  FloatRButton,
  ClickableLabel,
  DashHeader,
  InlineCell,
  DropDownIcon,
  RequestBox,
}