const {getAsync, setAsync, deleteAsync} = require("../../repository/asyncRepository");

const { signInUser } = require('../../services/auth');

describe('auth', () => {
  describe('signinUser', () => {
    it('should create a user in the db', async () => {
      const signInResult = await signInUser('bananapants');
      expect(signInResult).toEqual('OK');
      const result = await getAsync('bananapants');
      expect(result).toEqual('true');
      await deleteAsync('bananapants');
    });

    it('should throw when user already exists', async () => {
      await setAsync('bananapants', true);
      await expect(signInUser('bananapants'))
        .rejects.toThrowError('Username bananapants already signed in');
      await deleteAsync('bananapants');
    })
  })
});