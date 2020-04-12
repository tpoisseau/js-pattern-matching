const objectStrictLike = matchValue => patternValue => {
  for (const [key, val] of Object.entries(matchValue)) {
    try {
      if (!Reflect.has(patternValue, key)) return false;
      if (Reflect.get(patternValue, key) !== val) return false;
    } catch {
      return false;
    }
  }

  return true;
};

export default objectStrictLike;
