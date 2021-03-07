const UUID = require('uuid');
const {
  setHashmapAsync, listPushAsync, getPartOfListAsync, getHashmapValueAsync,
} = require('../repository/asyncRepository');

async function addMessageToDb(messageInfo) {
  const messageUuid = UUID.v4();
  await setHashmapAsync(messageUuid, messageInfo);
  await listPushAsync('messages', messageUuid);
}

async function getMessageInRange(start = 0, end = 19) {
  const messageUuids = await getPartOfListAsync('messages', start, end);

  const messages = [];
  for (const messageUuid of messageUuids) {
    const object = {};
    object.message = (await getHashmapValueAsync(messageUuid, 'message'));
    object.messageSender = (await getHashmapValueAsync(messageUuid, 'messageSender'));
    messages.push(object);
  }
  return messages;
}

module.exports = {
  addMessageToDb,
  getMessageInRange,
};
