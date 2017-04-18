const express = require('express');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');

const messageHandlerConstructor = require('./messageHandler')

const app = express();
const PORT = process.env.PORT || 5000;
// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));
// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

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

let groupIdGen = 0
const makeNewGroup = () => {
  groupIdGen++
  const newGroupID = groupIdGen
  const newGroup = { group_id: newGroupID, ready:false, voteCollection: {} }
  groupLib[newGroupID] = newGroup
  return newGroup
}



//This is stuff intended for outgoing socket messages, use messageHandler for incoming messages
io.on('connection', (socket) => {
  console.log('A user has connected.', io.engine.clientsCount, Date.now());
  io.sockets.emit('usersConnected', io.engine.clientsCount);
  // ------------------

  console.log()

  const updateLib = (group_id, newData) => {
    groupLib[group_id] = newData
    // io.sockets.emit('VoteUpdate', { newData })
    io.to(group_id).emit('VoteUpdate', { newData })
  }

  const messageHandler = new messageHandlerConstructor(socket, updateLib.bind(this), io)

  socket.on('message', (group_id, message) => {

    if (group_id === 'new') {
      const newGroup = makeNewGroup()
      socket.emit('GROUP_ID_ARRIVE', { ok: true, body: newGroup })
    }

    const groupInfo = groupLib[group_id]
    if (groupInfo) {
      socket.join(group_id)
      messageHandler.setGroup(groupInfo)
      messageHandler.handle({ message })
    } else {
      socket.emit('FIND_GROUP_REPLY', {ok: false, body: {}});
    }
  })

  // HOW CAN I lock in the group id on socket connection
  // three states: no_group, group_not_found, group_connected

  // socket.on('disconnect', () => {
  //   console.log('A user has disconnected.', io.engine.clientsCount);
  //   io.sockets.emit('usersConnected', io.engine.clientsCount);
  // })

});
