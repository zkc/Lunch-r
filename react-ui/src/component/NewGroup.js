import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';



/// Collect input data into state. sends socket message on submit.

export default class NewGroup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      location: '',
      init_time: Date.now(), //Maybe try moment.js??
      lunch_time: '1200PM', //Definitly try moment.js.
      vote_link: '',
      group_id: ''
    }
  }

  render() {
    return (
      <div>
        <h3>Create New Group</h3>
        {`Group ID: ${this.state.group_id}`}
        {this.state.group_id && <Redirect to={`/new/${this.state.group_id }`}/>}
      </div>
    )
  }

  componentDidMount() {
    const { socket, group_id } = this.props
    console.log(group_id)
    if(!group_id) {
      socket.send('new')
      .on('GROUP_ID_ARRIVE', ({ body }) => {
        this.setState({ group_id: body.group_id });
        console.log('group id here', body);
        <Redirect to={`/new/${body.group_id }`}/>
      })
    } else {
      console.log('this group is good yo');
      this.setState({group_id})
    }

  }
}