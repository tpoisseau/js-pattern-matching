const haveKeys = (...keys) => patternValue =>
  keys.map(key => Reflect.has(patternValue, key))
    .every(hasKey => hasKey);

export default haveKeys;