const UUID = require('uuid');
const {
  getFullListAsync, listPushAsync, deleteAsync, listPopAsync, getHashmapValueAsync, setHashmapAsync,
} = require('../../repository/asyncRepository');

const { getMessageInRange, addMessageToDb } = require('../../services/message');

describe('message', () => {
  describe('addMessageToDb', () => {
    it('adds a message to the database', async () => {
      const messages = await getFullListAsync('messages');
      const currentLength = messages.length;
      const messageInfo = { messageSender: 'bananapants', message: 'I has a message' };
      await addMessageToDb(messageInfo);
      const updatedMessages = await getFullListAsync('messages');
      const updatedLength = updatedMessages.length;
      expect(updatedLength).toEqual(currentLength + 1);
      const newMessage = await getHashmapValueAsync(updatedMessages[0], 'message');
      expect(newMessage).toEqual(messageInfo.message);
      await deleteAsync(updatedMessages[0]);
      await listPopAsync('messages');
    });
  });

  describe('getMessageInRange', () => {
    it('retrieves all messages in a range of indexes', async () => {
      const message1Uuid = UUID.v4();
      const message1Info = { messageSender: 'mario', message: 'its a me a mario' };
      const message2Uuid = UUID.v4();
      const message2Info = { messageSender: 'mario', message: 'yahoooooo' };
      await setHashmapAsync(message1Uuid, message1Info);
      await setHashmapAsync(message2Uuid, message2Info);
      await listPushAsync('messages', message1Uuid);
      await listPushAsync('messages', message2Uuid);
      const result = await getMessageInRange(0, 1);
      expect(result.length).toEqual(2);
      expect(result[0]).toEqual(message2Info);
      expect(result[1]).toEqual(message1Info);
      await deleteAsync(message1Uuid);
      await deleteAsync(message2Uuid);
      await listPopAsync('messages');
      await listPopAsync('messages');
    });
  });
});
