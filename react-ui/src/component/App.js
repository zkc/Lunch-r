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
          <Route path={'/join/:group_id'} render={({ match }) => <VotePage socket={socket} group_id={ match.params.group_id } />} />
        </div>
      </div>
    );
  }
}

export default App;
