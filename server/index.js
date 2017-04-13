const express = require('express');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');


const app = express();
const PORT = process.env.PORT || 5000;

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

// Answer API requests.
app.get('/api', function (req, res) {
  res.set('Content-Type', 'application/json');
  res.send('{"message":"Hello from the lunch-r custom server!"}');
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

// app.listen(PORT, function () {
//   console.log(`Listening on port ${PORT}`);
// });

////------ Socket stuff from old-lunch-r

const server = http.createServer(app)
                      .listen(PORT, () => {
                        console.log(`Listening on port ${PORT}.`);
                      });

const io = socketIo(server);

const groupLib = {
  //group_id: { ...group_data, group_id }
  '1234': {
    group_id: '1234',
    leader:'Testeroni',
    top_options: {
      1: 'Pizza Pizza',
      2: 'French Fry Bonanza',
      3: 'Fishy Fish'
    }
  }
}

io.on('connection', (socket) => {
  console.log('A user has connected.', io.engine.clientsCount, Date.now());

  io.sockets.emit('usersConnected', io.engine.clientsCount);


  socket.on('disconnect', () => {
    console.log('A user has disconnected.', io.engine.clientsCount);
    io.sockets.emit('usersConnected', io.engine.clientsCount);
  })

  socket.on('message', (channel, message) => {
    //switch channel and message. channel is group_id, message object has all info.
    // console.log(channel, message)
    switch (channel) {
      case 'FIND_GROUP':
        //check for group in storage
        if (groupLib[message]) {
          socket.emit('FIND_GROUP_REPLY', {ok: true, body: groupLib[message]});
        } else {
          socket.emit('FIND_GROUP_REPLY', {ok: false, body: {}});
        }
        break;
      default:
        console.log('No case for channel: ', channel)

    }
    //create new group: create local session with unique key. key also used for url
  })
});
