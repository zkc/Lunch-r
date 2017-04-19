import React, { Component } from 'react';
import OptionCard from './OptionCard'

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
        const currentLocation = group.top3[option]
        const totalVoteCount = Object.keys(group.voteCollection).reduce((res, user_id) => {
          group.voteCollection[user_id] === currentLocation ? res++ : res
          return res
        }, 0)
        return (
          <OptionCard key={i}
          location={ currentLocation }
          updateChoice={ this.updateChoice.bind(this) }
          isSelected={ user_choice === currentLocation }
          voteTotal={ totalVoteCount }
          />
        )
      }).sort((a,b) => {
        return b.props.voteTotal - a.props.voteTotal
      })
  }

  updateChoice(location) {
    const { socket, group_id, user_nug } = this.props
    this.setState({ user_choice: location })
    socket.emit('addVote', { group_id, user_choice: location, user_id: user_nug.user_id })
  }

  render() {
    const { loading, group_found } = this.state
    const { group_id, user_nug } = this.props

    return (
      <div className="vote-page">
        <h3>{`Group: ${group_id}`}</h3>
        <div className="option-container">{
          loading ?
            'Collecting Votes' :
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