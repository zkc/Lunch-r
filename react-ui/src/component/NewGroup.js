import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';



/// Collect input data into state. sends socket message on submit.

export default class NewGroup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      group: {
        location: 'stonewall',
        init_time: Date.now(), //Maybe try moment.js??
        lunch_time: '1200PM', //Definitly try moment.js.
        group_id: '',
        top3: {first: 'bipity', second: 'bopity', third:'boop'},
        voteCollection: {},
      }
    }
  }

  sendNewGroup() {
    const { socket } = this.props
    socket.emit('sendNewGroup', this.state.group)
  }

  render() {
    // Object.assign(this.state.group, { group_id: this.state.group_id})
    const { top3, location, group_id } = this.state.group
    return (
      <div>
        <h3>Create New Group</h3>
        {`Group ID: ${group_id || '#'}`}

        <p>Enter Location</p>
        <input value={location} onChange={(e) => this.setState({ location: e.target.value })} />

        <p>Enter 3 Options</p>
        <input value={top3.first} onChange={(e) => this.setState({ top3: Object.assign(top3, { first: e.target.value }) })} />
        <input value={top3.second} onChange={(e) => this.setState({ top3: Object.assign(top3, { second: e.target.value }) })} />
        <input value={top3.third} onChange={(e) => this.setState({ top3: Object.assign(top3, { third: e.target.value }) })} />
        <button onClick={() => this.sendNewGroup()}>Create Group</button>
      </div>
    )
  }

  componentDidMount() {
    const { socket, group_id } = this.props
    if(!group_id) {
      socket.emit('makeNewGroup', 'user_id' , (group_id) => {
        this.setState({ group: {...this.state.group, group_id } });
      })
    } else {
      console.log('this group is good?');
      this.setState({group_id})
    }

  }
}