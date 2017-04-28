import React, { Component } from 'react';
import OptionCard from './OptionCard'

/// when app hits user's lunchtime, switch join page to a map that shows where lunch is at

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

    const allVoteCount = group.top3.map((option, i) => {
      const totalVoteCount = Object.keys(group.voteCollection).reduce((res, user_id) => {
        group.voteCollection[user_id] === option ? res++ : res
        return res
      }, 0)

      return { currentLocation: option, totalVoteCount }
    })

    const optionLocationSortedByVoteCount = allVoteCount.slice().sort((a,b) => {
      return b.totalVoteCount - a.totalVoteCount
    }).map(o => o.currentLocation)

    const allOption = allVoteCount.map((option, i) => {
      return (
        <OptionCard key={i}
        location={ option.currentLocation }
        updateChoice={ this.updateChoice.bind(this) }
        isSelected={ user_choice === option.currentLocation }
        voteTotal={ option.totalVoteCount }
        topPad={optionLocationSortedByVoteCount.indexOf(option.currentLocation)*120}
        />
      )
    })

    return allOption
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
      <div className="orange-text">
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