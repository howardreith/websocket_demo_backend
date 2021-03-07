const {
  getAsync, setAsync, deleteAsync, getHashmapValueAsync, deleteHashmapValueAsync, setHashmapAsync,
} = require('../../repository/asyncRepository');

const { signInUser, terminateSocketSession } = require('../../services/auth');

describe('auth', () => {
  describe('signinUser', () => {
    it('should create a user in the db', async () => {
      const signInResult = await signInUser('bananapants', 'BXLN6FupkQIMzYvLBAAP');
      expect(signInResult).toEqual('OK');
      const hashmapResult = await getHashmapValueAsync('connections', 'BXLN6FupkQIMzYvLBAAP');
      expect(hashmapResult).toEqual('bananapants');
      const result = await getAsync('bananapants');
      expect(result).toEqual('true');
      await deleteAsync('bananapants');
      await deleteHashmapValueAsync('connections', 'BXLN6FupkQIMzYvLBAAP');
    });

    it('should throw when user already exists', async () => {
      await setAsync('bananapants', true);
      await expect(signInUser('bananapants'))
        .rejects.toThrowError('Username bananapants already signed in');
      await deleteAsync('bananapants');
    });
  });

  describe('terminateSocketSession', () => {
    it('terminates the socket session by socket id', async () => {
      await setHashmapAsync('connections', { BXLN6FupkQIMzYvLBAAP: 'Bulbasaur' });
      await setAsync('Bulbasaur', true);
      const result = await terminateSocketSession('BXLN6FupkQIMzYvLBAAP');
      expect(result).toEqual(1);
      const usernameResult = await getAsync('Bulbasaur');
      expect(usernameResult).toBeFalsy();
      const connectionsResult = await getHashmapValueAsync('connections', 'BXLN6FupkQIMzYvLBAAP');
      expect(connectionsResult).toBeFalsy();
    });
  });
});
