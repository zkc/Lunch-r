import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import VotePage from './VotePage'
import NewGroup from './NewGroup'
import '../style/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: require('socket.io-client')(),
      user_nug: { user_id: null }
    };
  }

  render() {
    const { socket, user_nug } = this.state
    return (
      <div className="App">
        <div className="App-header">
          <h2 className="app-title">Lunch-r</h2>
          <Link className="make-new-group" to="/new">
            Start a new Group
          </Link>
        </div>
        <div className="App-intro">
          <Route path={'/join/:group_id'} render={({ match }) => <VotePage socket={socket} user_nug={user_nug} group_id={ match.params.group_id } />} />
          <Route exact path={'/new'} render={({ match }) => <NewGroup socket={socket} history={this.props.history} group_id={ match.params.group_id } />} />
          <Route path={'/new/:group_id'} render={({ match }) => <NewGroup socket={socket} group_id={ match.params.group_id } />} />
        </div>
      </div>
    );
  }

  componentDidMount() {
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
