export function l(stuff = this) {
  if (__DEV__) {
    console.log(stuff); // eslint-disable-line no-console
  }
  return stuff;
}

if (__DEV__) {
  window.l = l;
}

export function isSubsetOf(s1, s2) {
  const result = s1.reduce((acc, key) => {
    acc[key] = false;
    return acc;
  }, {});

  s2.forEach((key) => {
    if (result.hasOwnProperty(key)) {
      result[key] = true;
    }
  });

  return Object.keys(result).every((key) => result[key]);
}
