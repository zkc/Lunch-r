import React, { Component } from 'react';
import OptionCard from './OptionCard'

//vote page finds group after mounting.
export default class VotePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      group: {},
      loading: true,
      group_found: false,
      user_choice: '',
    }
  }

  makeOptions() {
    const { group, user_choice } = this.state
    console.log(group)
    if (!group.ready) { return [] };
    return Object.keys(group.top3).map(
      (option, i) =>
        <OptionCard key={i}
        location={ group.top3[option] }
        update={ this.updateChoice.bind(this) }
        isSelected={ user_choice === group.top3[option] }
        />)
  }

  updateChoice(location) {
    this.setState({ user_choice: location })
  }

  render() {
    const { loading, group_found } = this.state
    return (
      <div>
        <h3>Cast your vote</h3>
        <p>{
          loading ? 'Collecting Votes' :
            group_found ?
            this.makeOptions() :
            'Group Not Found'
        }</p>
      </div>
    )
  }

  componentDidMount() {
    const { socket, group_id } = this.props
    //use group_id as channel name, then message/response obj has all data

    socket.send(group_id, {type: 'FIND_GROUP', group_id})
      .on('FIND_GROUP_REPLY', (res) => {
        if(res.ok) {
          this.setState({loading: false, group_found: true, group: res.body})
          console.log(res.body)
        } else {
          this.setState({loading: false, group_found: false})
        }
      })
  }
}