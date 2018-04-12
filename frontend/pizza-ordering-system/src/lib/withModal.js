import React, { Component, Fragment } from 'react';

function withPopupForm(LOC) {
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
        <LOC 
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
        <div className='fade-in fill'>
          { 
            selected &&
            <Fragment>
              <div  style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      zIndex: 99,
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    }}
                    onClick={setForm(null)} />
              <Form />
            </Fragment>
          }
          <div  className='fill'
                style={{
                  filter: selected ? 'blur(4px)' : 'none',
                  WebkitFilter: selected ? 'blur(4px)' : 'none',
                }} >
            { LOC }
          </div>
        </div>
      )
    }
  }
}

export default withPopupForm;