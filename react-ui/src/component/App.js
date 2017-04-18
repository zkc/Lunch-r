import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import VotePage from './VotePage'
import NewGroup from './NewGroup'
import '../style/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: require('socket.io-client')(),
      user_nug: {}
    };
  }

  // componentWillMount() {
  //   // check/set localStorage for a temp user_id
  //
  //   // if there's a past session/group_id, pick up where they left off at.
  //   //**? can use setState
  // }


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

  componentDidMount() {
    const { socket } = this.state
    socket.on('usersConnected', (count) => {
      console.log('Connected Users: ' + count);
    });

    const json = localStorage.getItem('lunchR')
    let user_nug
    if(json) {
      user_nug = JSON.parse(json)
    } else {
      user_nug = {
        user_id: Date.now()
      }
      localStorage.setItem('lunchR', JSON.stringify(user_nug))
    }
    this.setState({ user_nug })

  }

}


export default App;







