import React, { Component } from 'react';
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
      socket.send('Join Group', 'abc123')
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          {'This is '}
          <a href="https://github.com/mars/heroku-cra-node">
            {'create-react-app with a custom Node/Express server'}
          </a><br/>
        </p>
      </div>
    );
  }
}

export default App;
