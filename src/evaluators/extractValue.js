const extractValue = schema => value => {
  const newValue = {};

  for (let [fromKey, toKey] of Object.entries(schema)) {
    const istoKeyBoolean = typeof toKey === 'boolean';

    if (istoKeyBoolean && !toKey) continue;

    if (typeof toKey === 'function') {
      newValue[fromKey] = toKey(value)
    }
    else {
      newValue[fromKey] = value[istoKeyBoolean ? fromKey : toKey];
    }
  }

  return newValue;
};

export default extractValue;
