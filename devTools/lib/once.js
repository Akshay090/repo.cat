const once = (fn) => {
  let res = '__NEVER_EVER_CALLED__';

  return function onceTarget(...args) {
    if (res === '__NEVER_EVER_CALLED__') {
      res = fn(...args);
    }

    return res;
  };
};

module.exports = once;
