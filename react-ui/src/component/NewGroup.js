import React, { Component } from 'react';
import Script from 'react-load-script';

import FilterOptions from './FilterOptions'

export default class NewGroup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      group: {
        location: '',
        init_time: Date.now(), //Maybe try moment.js??
        lunch_time: '1200PM', //Definitly try moment.js.
        group_id: '',
        top3: [],
        voteCollection: {},
      },
      search_location: '',
      place_ready: false,
      api_key: null,
      show_filter: false,
      optionObj: {}
    }
  }

  startNewGroup() {
    const { socket, history } = this.props
    const location_result = this.autocomplete.getPlace()
    const lat = location_result.geometry.location.lat();
    const lng = location_result.geometry.location.lng();
    const updated_group = Object.assign({}, this.state.group, { placeInfo: location_result, lat, lng })
    socket.emit('startNewGroup', updated_group, (json) => {
      console.log(json)
      this.setState({show_filter: true, optionObj: json, place_ready: false })
    })
  }

  googleReady() {
    const input = document.getElementById('auto')
    const options = {}

    this.autocomplete = new window.google.maps.places.Autocomplete(input, options)

    window.google.maps.event.addListener(this.autocomplete, 'place_changed', (e) => {
      this.setState({ place_ready: true })
      this.startNewGroup()
    });
  }

  error() {
    console.log('error with google places')
  }

  submitLocationChoices(top3) {
    const { socket, history } = this.props
    const { group } = this.state
    Object.assign(group, { top3 })
    socket.emit('updateGroupChoices', group, () => {
      history.push(`/share/${this.state.group.group_id}`)
    })

  }

  render() {
    const { group: { group_id } , place_ready, api_key, show_filter, optionObj } = this.state
    return (
      <section className="orange-text">
        {
          api_key ?
          <Script
            url={`https://maps.googleapis.com/maps/api/js?key=${api_key}&libraries=places`}
            onLoad={() => this.googleReady()}
            onError={() => this.error()}
          />
          : null
        }
        <h3>Create New Lunch-r Group</h3>
        <input placeholder="Where y'all at?" id="auto" />
        {
          place_ready ?
          <div className="create group-button" onClick={() => this.startNewGroup()}></div>
          : <div className={`enter group-button ${show_filter && 'flipped'}`} ></div>
        }
        {
          show_filter ?
          <FilterOptions {...optionObj} submitLocationChoices={this.submitLocationChoices.bind(this)} />
          : null
        }
      </section>
    )
  }

  componentDidMount() {
    const { socket } = this.props
    socket.emit('makeNewGroup', 'user_id' , (group_id, api_key) => {
      this.setState({ group: { ...this.state.group, group_id }, api_key });
    })
  }
}
