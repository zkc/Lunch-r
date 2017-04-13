import React, { Component } from 'react';


/// Collect input data into state. sends socket message on submit.

export default class NewGroup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      location: '',
      init_time: Date.now(), //Maybe try moment.js??
      lunch_time: '1200PM', //Definitly try moment.js.
      vote_link: ''
    }
  }

  render() {

    return (
      <div>
        <h3>Create New Group</h3>
      </div>
    )
  }
}