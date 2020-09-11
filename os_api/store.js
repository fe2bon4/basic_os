const store = {};

const unlock = function (key) {
  // Guard against nonexistent keys
  if (!store[key]) {
    throw new Error("Cannot unlock nonexistent key.");
  }

  // Unlock Stored key
  store[key].lock = false;

  return true;
};

const lock = function (key, timeout_ms = 1000) {
  // Guard against null Keys
  if (!key) {
    throw new Error("Parameter key is required for lock operation.");
  }

  // Guard against nonexistent keys
  if (!store[key]) {
    throw new Error("Cannot Lock nonexistent key.");
  }

  // Check stored resource for existing locks. return false if resource is currently locked.
  if (store[key].lock) {
    return false;
  }

  // Guard against Infinite locks
  if (timeout_ms === Infinity) {
    throw new Error("Cannot Lock resource indefinitely.");
  }

  // Set Timeout to auto unlock.
  store[key].timeout = setTimeout(function () {
    unlock(key);
  }, timeout_ms);

  // Lock the stored resource
  store[key].lock = true;

  return true;
};

const exists = function (key) {
  return store[key] ? true : false;
};

const isLocked = function (key) {
  return store[key].lock;
};

const set = function (key, value) {
  // Guard against null values
  if (!key || !value) {
    throw new Error(`Set Command missing parameters.`);
  }

  // Guard against existing locked resources
  if (exists(key) && isLocked(key)) {
    console.log(`Cannot Set Locked resource`);
    return 1;
  }

  // Set the resource
  store[key] = {
    lock: alse,
    timeout: null,
    value,
  };

  return 0;
};

const get = function (key) {
  // check exists, return null otherwise
  if (!exists(key)) {
    return null;
  }

  return store[key].value;
};

module.exports = {
  set,
  get,
  lock,
  unlock,
};
