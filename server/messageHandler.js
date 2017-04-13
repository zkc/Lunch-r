class messageHandler {
  constructor(socket) {
    this.socket = socket
    this.groupInfo = {}
  }

  handle({ message }) {
    console.log(message)
    switch (message.type) {
      case 'FIND_GROUP':
        this.socket.emit('FIND_GROUP_REPLY', { ok: true, body: this.groupInfo });
        break;
      default:
        console.log('Unknown message type ', message.type)
    }
  }

  setGroup(groupInfo) {
    if (!this.groupInfo.group_id) {
      this.groupInfo = groupInfo
    }
  }
}

module.exports = messageHandler