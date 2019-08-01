import returnValue from "./evaluators/returnValue.js";
import strictEqual from "./comparators/strictEqual.js";
import objectStrictLike from "./comparators/objectStrictLike.js";

class PatterMatching {
  #stack;
  #defaultEvaluator;

  constructor() {
    this.#stack = new Map();

    this.match = this.match.bind(this);
    this.default = this.default.bind(this);
    this.exec = this.exec.bind(this);
  }

  match(comparator, evaluator) {
    if (typeof comparator !== 'function') {
      comparator = comparator !== 'object' ? strictEqual(comparator) : objectStrictLike(comparator);
    }
    if (typeof evaluator !== 'function') {
      evaluator = returnValue(evaluator);
    }

    this.#stack.set(comparator, evaluator);

    return this;
  }

  default(evaluator = void 0) {
    this.#defaultEvaluator = typeof evaluator !== 'function'
      ? returnValue(evaluator)
      : evaluator;

    return this;
  }

  exec(value) {
    for (const [comparator, evaluator] of this.#stack.entries()) {
      if (comparator(value)) {
        return evaluator(value);
      }
    }

    if (this.#defaultEvaluator === void 0) {
      return value;
    }

    return this.#defaultEvaluator(value);
  }
}

function pattern(value) {
  return new Proxy(new PatterMatching(), {
    // so PatterMatching instance is callable
    apply(target, thisArg, args) {
      return target.exec(value);
    },
    // so exec is hotpatched and callable with no value (because value provided as pattern argument)
    get(target, prop, reciever) {
      if (prop === 'exec') return () => target.exec(value);

      return target[prop];
    }
  });
}

export default pattern;
export { PatterMatching };