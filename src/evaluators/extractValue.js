const extractValue = schema => value => {
  const newValue = {};

  for (let [fromKey, toKey] of Object.entries(schema)) {
    const istoKeyBoolean = typeof toKey === 'boolean';

    if (istoKeyBoolean && !toKey) continue;

    if (typeof toKey === 'function') {
      newValue[toKey] = toKey(value)
    }
    else {
      newValue[istoKeyBoolean ? fromKey : toKey] = value[fromKey];
    }
  }

  return newValue;
};

export default extractValue;