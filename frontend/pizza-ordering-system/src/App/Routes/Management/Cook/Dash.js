import React, { Component } from 'react';

class Dash extends Component {
  constructor() {
    super();

    this.state = {
      notifications: [],
      store: null,
    }
  }

  componentDidMount() {
    console.log(this.props.match.params)

  }

  render() {
    return (
      <div>

      </div>
    )
  }
}

export default Dash;