import returnValue from "./evaluators/returnValue.js";
import strictEqual from "./comparators/strictEqual.js";
import objectStrictLike from "./comparators/objectStrictLike.js";

class PatternMatching {
  constructor() {
    this._stack = new Map();
    this._defaultEvaluator = void 0;

    this.match = this.match.bind(this);
    this.default = this.default.bind(this);
    this.exec = this.exec.bind(this);
  }

  match(comparator, evaluator) {
    if (typeof comparator !== 'function') {
      comparator = (typeof comparator !== 'object') ? strictEqual(comparator) : objectStrictLike(comparator);
    }
    if (typeof evaluator !== 'function') {
      evaluator = returnValue(evaluator);
    }

    this._stack.set(comparator, evaluator);

    return this;
  }

  default(evaluator = void 0) {
    this._defaultEvaluator = (typeof evaluator !== 'function')
      ? returnValue(evaluator)
      : evaluator;

    return this;
  }

  exec(value) {
    for (const [comparator, evaluator] of this._stack.entries()) {
      if (comparator(value)) {
        return evaluator(value);
      }
    }

    if (this._defaultEvaluator === void 0) {
      return value;
    }

    return this._defaultEvaluator(value);
  }
}

function pattern(value) {
  const patternMatcher = new PatternMatching();
  const execPatternMatcher = () => patternMatcher.exec(value);
  
  return new Proxy(function(){}, {
    // so PatternMatching instance is callable
    apply(target, thisArg, args) {
      return patternMatcher.exec(value);
    },
    get(target, prop, reciever) {
      // so exec is hotpatched and callable with no value (because value provided as pattern argument)
      if (prop === 'exec') return execPatternMatcher;

      const targetProp = patternMatcher[prop];
      // So other method is hotpatched for keep fluent api but instead of return `this` instance of `PatternMatching`
      // return the proxy
      if (typeof targetProp === 'function') return (...args) => {
        const result = targetProp.apply(patternMatcher, args);
        
        return (result === patternMatcher) ? reciever : result;
      };

      // else return the property
      return targetProp;
    }
  });
}

export default pattern;
export { PatternMatching };
