import React, { Component } from 'react';
import FilterOptionCard from './FilterOptionCard'

export default class FilterOptions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      group: {},
      loading: true,
      group_found: false,
      user_choice: '',
      results: props.results,
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)

    if (nextProps.next_page_token != this.props.next_page_token) {
      this.setState({ results: nextProps.results })
    }
  }

  makeOptions() {
    const { results } = this.state

    // topPad used to stack up options in order of array.

    const allOption = results.map((option, i) => {
      return (
        <FilterOptionCard key={i}
        location={ option.name }
        updateChoice={ this.updateChoice.bind(this) }
        voteTotal={ option.totalVoteCount }
        topPad={i*120}
        />
      )
    }).slice(0,3)

    return allOption
  }

  updateChoice(location) {
    const filteredResults = this.state.results.filter(result => result.name != location)
    this.setState({ results: filteredResults })
  }

  render() {
    const { submitLocationChoices } = this.props
    const { results } = this.state

    return (
      <div className="filter-section orange-text">
        { this.makeOptions() }
        <div onClick={ () => submitLocationChoices(results.slice(0,3)) }>Click to Start Group</div>
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