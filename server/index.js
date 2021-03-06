const express = require('express');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
const fetch = require('node-fetch');

const API_KEY = process.env.GOOG_API || require('./api')

const app = express();
const PORT = process.env.PORT || 5000;
// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));
// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

const server = http.createServer(app)
                      .listen(PORT, () => {
                        console.log(`Listening on port ${PORT}.`);
                      });

const io = socketIo(server);

const groupLib = {}

let groupIdGen = 0
const makeNewGroup = () => {
  groupIdGen++
  const newGroupID = groupIdGen
  const newGroup = { group_id: newGroupID, ready:false, voteCollection: {} }
  groupLib[newGroupID] = newGroup
  return newGroup
}


io.on('connection', (socket) => {
  //new connection, returns API key
  socket.on('makeNewGroup', (name, fn) => {
    const newGroupID = makeNewGroup().group_id
    socket.join(newGroupID)
    fn(newGroupID, API_KEY)
  })

  socket.on('startNewGroup', (groupInfo, fn) => {
    fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${groupInfo.lat},${groupInfo.lng}&rankby=distance&type=restaurant&key=${API_KEY}`)
    .then((res) => {
      res.json().then((jsonRes) => {
        fn(jsonRes)
      })
    })
  })
  //sending out group info with group_id

  socket.on('updateGroupChoices', (groupInfo, fn) => {
    groupLib[groupInfo.group_id] = groupInfo
    fn()
  })


  socket.on('sendNewGroup', (groupInfo, fn) => {
    fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${groupInfo.lat},${groupInfo.lng}&rankby=distance&type=restaurant&key=${API_KEY}`)
    .then((res) => {
      res.json().then((json) => {
        const firstThree = json.results.slice(0,3).map(res => res.name)
        groupInfo.top3 = firstThree

        //take closet three results and update groupLib.
        // ++ store remaining options as alternatives.
        // or! send the whole list to compoment were creator can filter out options before sending?

        fn(json)
      })
    })
  })

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
    const { user_id, user_choice, group_id } = vote
    groupLib[group_id].voteCollection[user_id] = user_choice
    io.to(group_id).emit('VoteUpdate', { newData: groupLib[group_id] })
  })


  // socket.on('disconnect', () => {
  //   console.log('A user has disconnected.', io.engine.clientsCount);
  //   io.sockets.emit('usersConnected', io.engine.clientsCount);
  // })

});
