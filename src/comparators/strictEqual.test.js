import test from 'ava';
import strictEqual from "./strictEqual.js";

test('strictEqual: a === b', t => {
  t.true(strictEqual('a')('a'));
});

test('strictEqual: a !== b', t => {
  t.false(strictEqual('a')('b'));
});

test('strictEqual: 0 !== "0"', t => {
  t.false(strictEqual(0)('0'));
});

test('strictEqual: 1 !== true', t => {
  t.false(strictEqual(1)(true));
});

test('strictEqual: function identity === function identity', t => {
  function identity() {}
  
  t.true(strictEqual(identity)(identity));
});

test('strictEqual: function f1 !== function f2', t => {
  function f1() {}
  function f2() {}
  
  t.false(strictEqual(f1)(f2));
});
