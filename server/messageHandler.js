class messageHandler {
  constructor(socket) {
    this.socket = socket
    this.groupInfo = {}
  }

  handle({ message }) {
    const { socket, groupInfo } = this
    // console.log(message)
    switch (message.type) {
      case 'FIND_GROUP':
        socket.emit('FIND_GROUP_REPLY', { ok: true, body: groupInfo });
        break;
      case 'SEND_GROUP_INFO':
        console.log(message);
        this.groupInfo = message.body;
        break
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