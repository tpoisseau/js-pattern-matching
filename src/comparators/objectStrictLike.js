const objectStrictLike = matchValue => patternValue => {
  for (const [key, val] of Object.entries(matchValue)) {
    if (!Reflect.has(patternValue, key)) return false;
    if (Reflect.get(patternValue, key) !== val) return false;
  }

  return true;
};

export default objectStrictLike;