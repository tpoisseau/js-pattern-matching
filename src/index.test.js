import test from 'ava';
import pattern, {PatternMatching} from "./index.js";
import {haveKeys} from "./comparators/index.js";
import {throwError} from "./evaluators/index.js";

const VectorStrategie = new PatternMatching()
  .match(haveKeys('x', 'y', 'z'), ({x, y, z}) => Math.sqrt(x**2 + y**2 + z**2))
  .match(haveKeys('x', 'y'), ({x, y}) => Math.sqrt(x**2 + y**2))
  .match(haveKeys('x'), ({x}) => x)
  .match(Array.isArray, vector => Math.sqrt.apply(Math, vector.map(v => v**2)))
  .default(NaN);

const V_3D = {x: 10, y: 10, z: 10};
const V_3D_LENGTH = Math.sqrt(V_3D.x**2 + V_3D.y**2 + V_3D.z**2);
const V_2D = {x: 10, y: 10};
const V_2D_LENGTH = Math.sqrt(V_2D.x**2 + V_2D.y**2);
const V_1D = {x: 10};
const V_1D_LENGTH = V_1D.x;
const V_ND = [0, 1, 2, 3, 4, 5, 6];
const V_ND_LENGTH = Math.sqrt.apply(Math, V_ND.map(v => v**2));

test(`PatternMatching: VectorStrategie: {x: 10, y: 10, z: 10} length === ${V_3D_LENGTH}`, t => {
  t.is(VectorStrategie.exec(V_3D), V_3D_LENGTH);
});

test(`PatternMatching: VectorStrategie: {x: 10, y: 10} length === ${V_2D_LENGTH}`, t => {
  t.is(VectorStrategie.exec(V_2D), V_2D_LENGTH);
});

test(`PatternMatching: VectorStrategie: {x: 10} length === ${V_1D_LENGTH}`, t => {
  t.is(VectorStrategie.exec(V_1D), V_1D_LENGTH);
});

test(`PatternMatching: VectorStrategie: [0, 1, 2, 3, 4, 5, 6] length === ${V_ND_LENGTH}`, t => {
  t.is(VectorStrategie.exec(V_ND), V_ND_LENGTH);
});

test(`PatternMatching: VectorStrategie: {bad: 'shape'} length is NaN`, t => {
  t.is(VectorStrategie.exec({bad: 'shape'}), NaN);
});

test('PatternMatching: match-comparator-function', t => {
  const isEven = new PatternMatching()
    .match(nb => typeof nb !== "number", throwError(new TypeError('not a number')))
    .match(nb => (nb % 2) === 0, true)
    .default(false);
  
  t.true(isEven.exec(10));
  t.false(isEven.exec(11));
  t.throws(() => isEven.exec('error'), {
    instanceOf: TypeError,
    message: 'not a number',
  });
});

test('PatternMatching: match-comparator-object', t => {
  const checkResponse = new PatternMatching()
    .match({status: 200}, 'OK')
    .match({status: 404}, 'Not Found')
    .match(({status}) => status > 200 && status < 300, 'OK with message')
    .match(({status}) => status >= 300 && status < 400, 'Redirect')
    .match(({status}) => status >= 400 && status < 500, 'Error Client')
    .match(({status}) => status >= 500 && status < 600, 'Error Server')
    .default(throwError(new Error('not a response')));
  
  t.is(checkResponse.exec({status: 200}), 'OK');
  t.is(checkResponse.exec({status: 404}), 'Not Found');
  t.is(checkResponse.exec({status: 205}), 'OK with message');
  t.is(checkResponse.exec({status: 302}), 'Redirect');
  t.is(checkResponse.exec({status: 400}), 'Error Client');
  t.is(checkResponse.exec({status: 500}), 'Error Server');
  t.throws(() => checkResponse.exec('error'), {
    instanceOf: Error,
    message: 'not a response',
  });
});

test('PatternMatching: match-comparator-any', t => {
  const matcher = new PatternMatching()
    .match(100, 'Continue')
    .match(101, 'Switching Protocols')
    .match(102, 'Processing')
    .match(103, 'Early Hints')
  
  t.is(matcher.exec(100), 'Continue');
  t.is(matcher.exec(101), 'Switching Protocols');
  t.is(matcher.exec(102), 'Processing');
  t.is(matcher.exec(103), 'Early Hints');
  
  t.is(matcher.exec('no-value'), 'no-value');
});

test('PatternMatching: match-evaluator-function', t => {
  const matcher = new PatternMatching()
    .match(100, nb => nb ** 2);
  
  t.is(matcher.exec(100), 100 ** 2);
});

test('PatternMatching: match-evaluator-any', t => {
  const matcher = new PatternMatching()
    .match(100, 900);
  
  t.is(matcher.exec(100), 900);
});

test('PatternMatching: default-evaluator-any', t => {
  const matcher = new PatternMatching()
    .default(50);
  
  t.is(matcher.exec('any'), 50);
  t.is(matcher.exec(40), 50);
});

test('PatternMatching: no-default-return-exec', t => {
  const matcher = new PatternMatching();
  
  t.is(matcher.exec('any'), 'any');
  t.is(matcher.exec(40), 40);
});

test('pattern: exec-as-function', t => {
  t.is(
    pattern(404)
      .match(404, 'Not Found')(),
    'Not Found'
  );
});

test('pattern: exec-without-value', t => {
  t.is(
    pattern(404)
      .match(404, 'Not Found')
      .exec(),
    'Not Found'
  );
});

test('pattern: exec-with-value', t => {
  t.is(
    pattern(404)
      .match(404, 'Not Found')
      .exec(505),
    'Not Found'
  );
});

test('pattern: default-throw-function', t => {
  t.throws(
    pattern('value')
      .default(throwError(new Error('default-throw-function'))),
    {
      instanceOf: Error,
      message: 'default-throw-function',
    }
  )
});
