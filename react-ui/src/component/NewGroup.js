import React, { Component } from 'react';
import Script from 'react-load-script';

// API_KEY here
const API_KEY = process.env.API_KEY

/// Collect input data into state. sends socket message on submit.

export default class NewGroup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      group: {
        location: '',
        init_time: Date.now(), //Maybe try moment.js??
        lunch_time: '1200PM', //Definitly try moment.js.
        group_id: '',
        top3: {first: 'bipity', second: 'bopity', third:'boop'},
        voteCollection: {},
      },
      search_location: '',
      place_ready: false
    }
  }

  sendNewGroup() {
    const { socket, history } = this.props
    const location_result = this.autocomplete.getPlace()
    const lat = location_result.geometry.location.lat();
    const lng = location_result.geometry.location.lng();
    const updated_group = Object.assign({}, this.state.group, { placeInfo: location_result, lat, lng })
    socket.emit('sendNewGroup', updated_group, () => {
      history.push(`/join/${this.state.group.group_id}`)
    })
  }

  render() {
    const { group: { group_id } , place_ready } = this.state
    return (
      <div className="vote-page">
        <Script
          url={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`}
          onLoad={() => this.googleReady()}
          onError={() => this.error()}
        />
        <h3>Create New Group</h3>
        <p>{`Group ID: ${group_id || '#'}`}</p>
        <input placeholder="Where y'all at?" id="auto" />
        {
          place_ready ?
          <div className="create group-button" onClick={() => this.sendNewGroup()}></div>
          :
          <div className="enter group-button" ></div>
        }
      </div>
    )
  }

  googleReady () {
    const input = document.getElementById('auto')
    const options = {}
    this.autocomplete = new window.google.maps.places.Autocomplete(input, options)

    window.google.maps.event.addListener(this.autocomplete, 'place_changed', (e) => {
      this.setState({ place_ready: true })
    });

  }

  error() {
    console.log('error with google places')
  }

  componentDidMount() {
    const { socket, group_id } = this.props

    if(!group_id) {
      socket.emit('makeNewGroup', 'user_id' , (group_id) => {
        this.setState({ group: {...this.state.group, group_id } });
      })
    } else {
      //this is going away? not really reloading /new, eventaully have user profile with groups, etc.
      this.setState({group_id})
    }
  }
}