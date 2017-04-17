class messageHandler {
  constructor(socket, updateLib, io) {
    this.socket = socket
    this.io = io
    this.groupInfo = {}
    this.updateLib = updateLib
  }

  handle({ message }) {
    const { socket, groupInfo, updateLib, voteCollection} = this
    switch (message.type) {
      case 'FIND_GROUP':
        socket.emit('FIND_GROUP_REPLY', { ok: true, body: groupInfo });
        break;
      case 'SEND_GROUP_INFO':
        updateLib(groupInfo.group_id, Object.assign(message.body, { ready: true }) )
        break
      // case 'UPDATE_GROUP':
      //   this.groupInfo
      case 'ADD_VOTE':
        //not using message.body here!! ???????
        console.log('adding vote', message)
        console.log('to this group', groupInfo)
        const { user_id, user_choice } = message
        groupInfo.voteCollection[user_id] = user_choice
        updateLib(groupInfo.group_id, groupInfo)
        // io.sockets.emit('VOTE_RESULT_UPDATE', { voteCollection });

        // Need to build up individual vote option cards
        // ********VVVV
        // votes[message.body.user_ID] = message.body.lunch_choice_ID
        break
      default:
        console.log('Unknown message type ', message.type)
    }
  }

  setGroup(groupInfoIn) {
    if (this.groupInfo.group_id != groupInfoIn.group_id) {
      console.log('setting group')
      this.groupInfo = groupInfoIn
    }
  }
}

module.exports = messageHandler