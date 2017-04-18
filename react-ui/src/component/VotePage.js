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
    return Object.keys(group.top3).map(
      (option, i) => {
        const count = Object.keys(group.voteCollection).reduce((res, cur) => {
          group.voteCollection[cur] === group.top3[option] ? res++ : res
          return res
        }, 0)
        return (
          <OptionCard key={i}
          location={ group.top3[option] }
          updateChoice={ this.updateChoice.bind(this) }
          isSelected={ user_choice === group.top3[option] }
          voteTotal={ count }
          />
        )
      })
  }

  updateChoice(location) {
    const { socket, group_id, user_nug } = this.props
    this.setState({ user_choice: location })
    socket.emit('addVote', { group_id, user_choice: location, user_id: user_nug.user_id })
  }

  render() {
    const { loading, group_found } = this.state
    return (
      <div>
        <h3>Cast your vote</h3>
        <div>{
          loading ? 'Collecting Votes' :
            group_found ?
            this.makeOptions() :
            'Group Not Found'
        }</div>
      </div>
    )
  }

  componentDidMount() {
    const { socket, group_id } = this.props
    socket.emit('joinGroup', group_id, (wasGroupFound, groupInfo) => {
      wasGroupFound ?
      this.setState({ loading: false, group_found: true, group: groupInfo })
      : this.setState({ loading: false, group_found: false })
    })

    socket.on('VoteUpdate', (res) => {
      this.setState( { group: res.newData } )
    })
  }
}