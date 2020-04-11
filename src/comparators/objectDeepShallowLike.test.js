import test from 'ava';
import objectDeepShallowLike from "./objectDeepShallowLike.js";

test('objectDeepShallowLike: {a: {a: 0, b: {c: 0}}} === {a: {a: 0, b: {c: 0}, c: 2}, b: 1}', t => {
  t.true(objectDeepShallowLike({a: {a: 0, b: {c: 0}}})({a: {a: 0, b: {c: 0}, c: 2}, b: 1}));
});

test('objectDeepShallowLike: {a: {a: 0, b: {c: "0"}}} === {a: {a: 0, b: {c: 0}, c: 2}, b: 1}', t => {
  t.true(objectDeepShallowLike({a: {a: 0, b: {c: "0"}}})({a: {a: 0, b: {c: 0}, c: 2}, b: 1}));
});

test('objectDeepShallowLike: {a: {a: 0, b: {c: 0}}} !== {a: {a: 0, b: 1, c: 2}, b: 1}', t => {
  t.false(objectDeepShallowLike({a: {a: 0, b: {c: 0}}})({a: {a: 0, b: 1, c: 2}, b: 1}));
});
