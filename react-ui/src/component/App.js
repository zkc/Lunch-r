import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import NotFound from './NotFound'
import VotePage from './VotePage'

import '../style/App.css';

///to join a group, take group id and send socket message on after mounting.
//router ignores id but uses it to send a websocket message back.

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: require('socket.io-client')()
    };
  }

  componentDidMount() {
    const { socket } = this.state
    socket.on('usersConnected', (count) => {
      console.log('Connected Users: ' + count);
      // socket.send('Join Group', 'abc123')
    });
    // socket.on('FIND_GROUP_REPLY', (res) => {
    //   console.log('response', res)
    // })
  }

  render() {
    const { socket } = this.state
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Lunch-r</h2>
        </div>
        <div className="App-intro">
          <Route path={'/join/:group_id'} render={({ match }) => {
            let okFlag = false
            socket.send('FIND_GROUP', match.params.group_id)
              .on('FIND_GROUP_REPLY', (res) => {
                console.log('response', res)
                if (res.ok) {
                  console.log('return VotePage')
                  okFlag = true
                } else {

                }
              })
              if (okFlag) {
                return <VotePage />
              }
              return <NotFound bad_id={match.params.group_id} />
            //socket call check for group info. if info, then return vote component with group data in props
            //else, return group not found
          }} />
        </div>
      </div>
    );
  }
}

export default App;
