import React, { Component } from 'react';

import {
  postCookStore,
  getCookStore,
  withModal,
  postCookMenu,
  deleteCookMenu,
} from 'lib';

class Cook extends Component {
  constructor() {
    super();

    this.state = {
      notifications: [],
      store: null,
      menu: [],
    }

    this.getStore = this.getStore.bind(this);
    this.postStore = this.postStore.bind(this);    
    this.addMenuItem = this.addMenuItem.bind(this);
    this.removeMenuItem = this.removeMenuItem.bind(this);
  }

  componentDidMount() {
    this.props.addForm('setup', props =>
      <div className='align-left centered-hv padding-lg edge-rounded bg-white'>
        <form onSubmit={this.postStore}>
          <p className='font-md' >You haven't setup a store yet.</p>
          <p className='font-md' >Please enter the store ID: </p>
          <input  className='input-fill' 
                  name='storeId' 
                  required />
          <br /><br />
          <button className='btn-md btn-pink font-md' >Submit</button>
          <br /><br />
          <button className='btn-md btn-pink font-md'
                  onClick={() => {
                    localStorage.removeItem('token');
                    this.props.setAppState({
                      type: '',
                      user: null,
                    }, () => {
                      this.props.history.push('/management/login')
                    })
                  }}>Logout</button>
        </form>
      </div>
    , true)

    this.getStore()
  }

  postStore(e) {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const storeId = e.target.storeId.value;

    if (token) {
      postCookStore(token, {
        storeId,
      })
        .then(json => {
          if (json && json.success) {
            if (json.store) {
              this.setState({
                store: json.store,
                menu: json.menu,
              })
              this.props.closeForm()();
            } else {
              json && alert(json.message);
            }
          } else {
            alert('failed to register store');
            this.props.history.push('/home')
          }
        })
    } else {
      localStorage.removeItem('token');
      this.props.setAppState({
        type: '',
        user: null,
      }, () => {
        this.props.history.push('/management/login')
      })
    }   
  }

  getStore() {
    const token = localStorage.getItem('token');
    if (token) {
      getCookStore(token)
        .then(json => {
          if (json && json.success) {
            if (json.statusUpdate) {
              alert(json.statusUpdate)
              window.location.reload();
            }
            if (json.store) {
              this.setState({
                store: json.store,
                menu: json.menu,
              })
            } else {
              setTimeout(this.props.setForm('setup'), 500);
            }
          } else {
            json && alert(json.message);
            this.props.history.push('/home')
          }
        })
    } else {
      localStorage.removeItem('token');
      this.props.setAppState({
        type: '',
        user: null,
      }, () => {
        this.props.history.push('/management/login')
      })
    }
  }

  addMenuItem(e) {
    e.preventDefault();
    e.persist();
    const name = e.target.name.value;
    const description = e.target.description.value;
    const price = e.target.price.value;

    const token = localStorage.getItem('token');
    if (token) {
      postCookMenu(token, {
        name,
        description,
        price,
      })
        .then(json => {
          if (json && json.success) {
            this.setState(({ menu }) => {
              menu.push(json.pizza);
              return menu;
            })
          } else {
            json && alert(json.message);
          }
          e.target.name.value = "";
          e.target.description.value = "";
          e.target.price.value = "";
        })
    } else {
      localStorage.removeItem('token');
      this.props.setAppState({
        type: '',
                      user: null,
      }, () => {
        this.props.history.push('/management/login')
      })
    }
  }

  removeMenuItem(itemId) {
    return () => {
      const token = localStorage.getItem('token');
      if (token) {
        deleteCookMenu(token, {
          itemId,
        })
          .then(json => {
            if (json && json.success) {
              this.getStore()
            } else {
              json && alert(json.message);
            }
          })
      } else {
        this.props.history.push('/home');
        this.props.setAppState({
          type: '',
        }, () => {
          this.props.history.push('/management/login')
        })
      }
    }
  }

  render() {
    return (
      <div className='fill bg-grey scrollable' >
        <div  className='align-right'>
          <button className='btn-md btn-pink margin-sm'
                  onClick={() => {
                    localStorage.removeItem('token');
                    this.props.setAppState({
                      type: '',
                      user: null,
                    }, () => {
                      this.props.history.push('/management/login')
                    })
                  }} >
 
            Logout
          </button>
          <div className='line-h' />
        </div>
  
        <div className='align-left margin-lg padding-lg'>
          <div className='font-txl margin-lg padding-lg'>
            Menu
            <div className='line-h margin-md' />      
            <div className="ui cards">

            {
              this.state.menu.map((pizza, id) =>
                <div className = "card" key={id}>
                  <div className = "content">
                    <div className = "header"> {pizza.name} </div>
                    <div className = "description"> 
                      {pizza.description}
                      <br></br>
                      ${pizza.price}
                    </div>
                    <br />
                    <div className = "extra content">
                      <div className = "ui two buttons">
                        <button className = "ui basic red button"
                                onClick={this.removeMenuItem(pizza.id)} >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              )
            }
            </div>
            <br />
            <h1> Add Item to Menu </h1>
            <div className="ui card">
              <div className = "content">
                <form className = "header"
                      onSubmit={this.addMenuItem} > 
                  <div className = "description">
                    <div className="ui input">
                      <input  type="text" 
                              placeholder="Name"
                              required
                              name='name' />
                    </div>
                    <br />
                    <div className="ui input">
                      <input  type="text" 
                              placeholder="Description" 
                              required
                              name='description' />
                    </div>
                    <br />
                    <div className="ui input">
                      <input  type="number" 
                              placeholder="Price" 
                              required
                              name='price' />
                    </div>
                  </div>

                  <button className="ui bottom attached button">
                    <i className="add icon"></i>
                    Add Item
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withModal(Cook);
