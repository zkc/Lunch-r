class messageHandler {
  constructor(socket, updateLib) {
    this.socket = socket
    this.groupInfo = {}
    this.updateLib = updateLib
  }

  handle({ message }) {
    const { socket, groupInfo, updateLib } = this
    switch (message.type) {
      case 'FIND_GROUP':
        socket.emit('FIND_GROUP_REPLY', { ok: true, body: groupInfo });
        break;
      case 'SEND_GROUP_INFO':
        this.updateLib(groupInfo.group_id, Object.assign(message.body, { ready: true }) )
        break
      // case 'UPDATE_GROUP':
      //   this.groupInfo
      case 'ADD_VOTE':
        console.log('adding vote')
        const { group_id, user_id, user_choice } = message.body

        // Need to build up individual vote option cards
        // ********VVVV
        // votes[message.body.user_ID] = message.body.lunch_choice_ID
        break
      default:
        console.log('Unknown message type ', message.type)
    }
  }

  setGroup(groupInfo) {
    console.log(groupInfo)
    // if (!this.groupInfo.group_id) {
      this.groupInfo = groupInfo
    // }
  }
}

module.exports = messageHandler