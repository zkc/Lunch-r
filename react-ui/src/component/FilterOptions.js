import React, { Component } from 'react';
import OptionCard from './OptionCard'

export default class FilterOptions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      group: {},
      loading: true,
      group_found: false,
      user_choice: '',
    }
  }
  //
  makeOptions() {
    const { results } = this.props

    // topPad used to stack up options in order of array.

    const allOption = results.map((option, i) => {
      console.log(option);
      return (
        <OptionCard key={i}
        location={ option.name }
        updateChoice={ this.updateChoice.bind(this) }
        voteTotal={ option.totalVoteCount }
        topPad={i*120}
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
    const { group_id, user_nug } = this.props

    return (
      <div className="orange-text">
        { this.makeOptions() }
      </div>
    )
  }

  // componentDidMount() {
  //   const { socket, group_id } = this.props
  //   socket.emit('joinGroup', group_id, (wasGroupFound, groupInfo) => {
  //     wasGroupFound ?
  //     this.setState({ loading: false, group_found: true, group: groupInfo })
  //     : this.setState({ loading: false, group_found: false })
  //   })
  //
  //   socket.on('VoteUpdate', (res) => {
  //     this.setState( { group: res.newData } )
  //   })
  // }
}