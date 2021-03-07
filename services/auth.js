const {
  setAsync, getAsync, setHashmapAsync, getHashmapValueAsync, deleteAsync, deleteHashmapValueAsync,
} = require('../repository/asyncRepository');

async function signInUser(username, socketid) {
  const userExists = await getAsync(username);
  if (userExists) {
    throw Error(`Username ${username} already signed in.`);
  }
  await setHashmapAsync('connections', { [socketid]: username });
  return setAsync(username, true);
}

async function terminateSocketSession(socketid) {
  const username = await getHashmapValueAsync('connections', socketid);
  await deleteAsync(username);
  return deleteHashmapValueAsync('connections', socketid);
}

module.exports = {
  signInUser,
  terminateSocketSession,
};
