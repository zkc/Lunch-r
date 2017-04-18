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
      case 'ADD_VOTE':
        const { user_id, user_choice } = message
        groupInfo.voteCollection[user_id] = user_choice
        updateLib(groupInfo.group_id, groupInfo)
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