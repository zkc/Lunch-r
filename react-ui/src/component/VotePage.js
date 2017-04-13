import React, { Component } from 'react';

//vote page finds group after mounting.
export default class VotePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      group: {},
      loading: true,
      group_found: false,
    }
  }

  render() {
    const { loading, group_found } = this.state
    return (
      <div>
        <h3>Cast your vote</h3>
        <p>{
          loading ? 'Collecting Votes' :
            group_found ?
            'Good Group!' :
            'Group Not Found'
        }
        </p>
      </div>
    )
  }

  componentDidMount() {
    const { socket, group_id } = this.props
    socket.send('FIND_GROUP', group_id)
      .on('FIND_GROUP_REPLY', (res) => {
        if(res.ok) {
          this.setState({loading: false, group_found: true, group: res.body})
        } else {
          this.setState({loading: false, group_found: false})
        }
      })
  }
}