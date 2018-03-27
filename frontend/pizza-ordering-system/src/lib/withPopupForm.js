import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

function withPopupForm(Wrapping) {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        forms: {},
        selected: null,
      }

      this.addForm = this.addForm.bind(this);
      this.setForm = this.setForm.bind(this);
    }

    componentWillMount() {
      const {
        addForm,
        setForm,
      } = this;

      this.LOC =          
        <Wrapping 
          addForm={addForm}
          setForm={setForm}
          { ...this.props } />
    }

    shouldComponentUpdate(nextProps, nextState) {
      return nextState.selected !== this.state.selected;
    }

    addForm(name, form) {
      this.setState(({ forms }) => {
        forms[name] = form;
        return {
          forms,
        }
      })
    }

    setForm(selected) {
      return () => {
        if (this.state.forms[selected] || selected === null) {
          this.setState({
            selected,
          })
        }
      }
    }

    render() {
      const {
        setForm,
        LOC,
      } = this;

      const {
        selected,
      } = this.state;

      const Form = this.state.forms[selected];

      return (
        <Fragment>
          { 
            selected &&
            <Fragment>
              <Mask onClick={setForm(null)}/>
                <Form />
            </Fragment>
          }
          <Blurrable
            blur={selected} >
            { LOC }
          </Blurrable>
        </Fragment>
      )
    }
  }
}

export default withPopupForm;

const Blurrable = styled.div.attrs({
  style: ({ blur }) => ({
    filter: blur ? 'blur(6px)' : 'none',
    WebkitFilter: blur ? 'blur(6px)' : 'none',
  })
})``

const Mask = styled.div`
  z-index: 99;
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`