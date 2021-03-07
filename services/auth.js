const {setAsync, getAsync} = require("../repository/asyncRepository");

async function signInUser(username) {
  const userExists = await getAsync(username);
  if (userExists) {
    throw Error(`Username ${username} already signed in.`)
  }
  return await setAsync(username, true);
}

module.exports = {
  signInUser
};