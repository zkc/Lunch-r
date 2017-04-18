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


const groupLib = { }
  //group_id: { ...group_data, group_id }

let groupIdGen = 0
const makeNewGroup = () => {
  groupIdGen++
  const newGroupID = groupIdGen
  const newGroup = { group_id: newGroupID, ready:false, voteCollection: {} }
  groupLib[newGroupID] = newGroup
  return newGroup
}


io.on('connection', (socket) => {
  const updateLib = (group_id, newData) => {
    groupLib[group_id] = newData
    io.to(group_id).emit('VoteUpdate', { newData })
  }
  //new connection, nothing known
  socket.on('makeNewGroup', (name, fn) => {
    const newGroupID = makeNewGroup().group_id
    socket.join(newGroupID)
    fn(newGroupID)
  })
  //new connection with group_id
  socket.on('sendNewGroup', (groupInfo) => groupLib[groupInfo.group_id] = groupInfo)

  //voter page joing a group, sending group_id from URL
  socket.on('joinGroup', (group_id, fn) => {
    const groupInfo = groupLib[group_id]
    if(groupInfo) {
      socket.join(group_id)
      fn(true, groupInfo)
    } else {
      fn(false)
    }
  })

  socket.on('addVote', (vote) => {
    const group_id = Object.keys(socket.rooms)[0]
    const { user_id, user_choice } = vote
    groupLib[group_id].voteCollection[user_id] = user_choice
    io.to(group_id).emit('VoteUpdate', { newData: groupLib[group_id] })
  })


  // socket.on('disconnect', () => {
  //   console.log('A user has disconnected.', io.engine.clientsCount);
  //   io.sockets.emit('usersConnected', io.engine.clientsCount);
  // })

});
