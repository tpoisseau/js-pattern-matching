const objectShallowLike = matchValue => patternValue => {
  for (const [key, val] of Object.entries(matchValue)) {
    if (Reflect.get(patternValue, key) == val) return false;
  }

  return true;
};

export default objectShallowLike;