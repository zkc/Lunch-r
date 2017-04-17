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
    console.log('making options for ', group)
    if (!group.ready) { return ['Group building in progress... not ready to vote just yet'] };
    return Object.keys(group.top3).map(
      (option, i) => {
        const count = Object.keys(group.voteCollection).reduce((res, cur) => {
          // console.log(group.voteCollection[cur], group.top3[option] );
          // console.log(group.voteCollection[cur] === group.top3[option])
          group.voteCollection[cur] === group.top3[option] ? res++ : res
          return res
        }, 0)
        console.log('this option has a count of', count)
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
    console.log(location)
    const { socket, group_id } = this.props
    this.setState({ user_choice: location })
    socket.send(group_id, {type: 'ADD_VOTE', user_choice: location, user_id: socket.id})
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
        console.log(res)
        if(res.ok) {
          this.setState({loading: false, group_found: true, group: res.body})
          console.log(res.body)
        } else {
          this.setState({loading: false, group_found: false})
        }
      })

    socket.on('VoteUpdate', (res) => {
      console.log('got vote update', res.newData)

      this.setState( { group: res.newData } )
    })
  }
}