import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import VotePage from './VotePage'
import NewGroup from './NewGroup'
import '../style/App.css';

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
    });
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
          <Route exact path={'/new'} render={({ match }) => <NewGroup socket={socket} group_id={ match.params.group_id } />} />
          <Route path={'/new/:group_id'} render={({ match }) => <NewGroup socket={socket} group_id={ match.params.group_id } />} />
        </div>
      </div>
    );
  }
}

export default App;

