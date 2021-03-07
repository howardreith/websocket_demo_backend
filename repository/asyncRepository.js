const redis = require('redis');
const client = redis.createClient(process.env.REDIS_URL);
const { promisify } = require("util");

client.on('connect', () => {
  console.info('Redis client connected');
});

client.on("error", (error) => {
  console.error(error);
});

const lrangeAsync = promisify(client.lrange).bind(client);
const get = promisify(client.get).bind(client);
const set = promisify(client.set).bind(client);
const del = promisify(client.del).bind(client);
const lpush = promisify(client.lpush).bind(client);
const lpop = promisify(client.lpop).bind(client);
const hmgetAsync = promisify(client.hmget).bind(client);
const hmsetAsync = promisify(client.hmset).bind(client)

async function setAsync(key, value) {
  return await set(key, value)
}

async function getAsync(key) {
  return get(key)
}

async function deleteAsync(key) {
  del(key)
}

async function getFullListAsync(key) {
  return lrangeAsync(key, 0, -1)
}

async function listPushAsync(listKey, value) {
  return lpush(listKey, value)
}

async function listPopAsync(listKey) {
  return lpop(listKey)
}

async function getPartOfListAsync(key, start, end) {
  return lrangeAsync(key, start, end);
}

async function getHashmapValueAsync(key, hashmapKey) {
  return (await hmgetAsync(key, hashmapKey))[0]
}

async function setHashmapAsync(key, hash) {
  return await hmsetAsync(key, hash)
}

module.exports = {
  getAsync,
  setAsync,
  deleteAsync,
  getPartOfListAsync,
  listPushAsync,
  listPopAsync,
  getFullListAsync,
  setHashmapAsync,
  getHashmapValueAsync
};