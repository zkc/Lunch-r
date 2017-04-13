class messageHandler {
  constructor(socket, updateLib) {
    this.socket = socket
    this.groupInfo = {}
    this.update = updateLib
  }

  handle({ message }) {
    const { socket, groupInfo } = this
    // console.log(message)
    switch (message.type) {
      case 'FIND_GROUP':
        socket.emit('FIND_GROUP_REPLY', { ok: true, body: groupInfo });
        break;
      case 'SEND_GROUP_INFO':
        console.log('groupinfo', message);
        this.update(groupInfo.group_id, message.body)
        // this.groupInfo = message.body;

        break
      // case 'UPDATE_GROUP':
      //   this.groupInfo
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