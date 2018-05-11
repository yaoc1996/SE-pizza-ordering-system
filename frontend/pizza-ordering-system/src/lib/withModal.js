import React, { Component } from 'react';

function withModal(LOC) {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        forms: {},
        locks: {},
        selected: null,
      }

      this.addForm = this.addForm.bind(this);
      this.setForm = this.setForm.bind(this);
      this.closeForm = this.closeForm.bind(this);
    }

    componentWillMount() {
      const {
        addForm,
        setForm,
        closeForm,
      } = this;

      this.LOC =          
        <LOC  closeForm={closeForm}
              addForm={addForm}
              setForm={setForm}
              { ...this.props } />
    }

    shouldComponentUpdate(nextProps, nextState) {
      return nextState.selected !== this.state.selected;
    }

    addForm(name, form, locked) {
      this.setState(({ forms, locks }) => {
        forms[name] = form;
        locks[name] = locked;
        return {
          forms,
          locks,
        }
      })
    }

    setForm(selected) {
      return () => {
        if (!this.state.locks[this.state.selected]){
          if (this.state.forms[selected] || selected === null) {
            this.setState({
              selected,
            })
          }
        }
      }
    }

    closeForm() {
      return () => {
        this.setState({
          selected: null,
        })
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
            <div>
              <div  style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      zIndex: 99,
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    }}
                    onClick={setForm(null)} />
              <Form />
            </div>
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

export default withModal;