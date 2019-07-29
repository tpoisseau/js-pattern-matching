import flattenObj from "../utils/flattenObj.js";

const objectDeepStrictLike = matchValue => {
  matchValue = flattenObj(matchValue);

  return patternValue => {
    patternValue = flattenObj(patternValue);

    for (const [key, val] of Object.entries(matchValue)) {
      if (!Reflect.has(patternValue, key)) return false;
      if (Reflect.get(patternValue, key) !== val) return false;
    }

    return true;
  }
};

export default objectDeepStrictLike;