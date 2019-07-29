export default function flattenObj(obj, parent, res = {}){
  for(const [key, value] of Object.entries(obj)) {
    const flatKey = parent ? `${parent}.${key}` : key;

    if(typeof value === 'object' && !Array.isArray(value)){
      flattenObj(value, flatKey, res);
    } else {
      res[flatKey] = value;
    }
  }

  return res;
}