const extract = schema => value => {
  const newValue = {};

  for (let [key, newKey] of Object.entries(schema)) {
    if (typeof newKey === 'boolean' && !newKey) continue;

    newKey = typeof newKey === 'boolean' ? key : newKey;
    newValue[newKey] = value[key];
  }

  return newValue;
};

export default extract;