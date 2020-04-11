import test from 'ava';
import objectDeepStrictLike from "./objectDeepStrictLike.js";

test('objectDeepStrictLike: {a: {a: 0, b: {c: 0}}} === {a: {a: 0, b: {c: 0}, c: 2}, b: 1}', t => {
  t.true(objectDeepStrictLike({a: {a: 0, b: {c: 0}}})({a: {a: 0, b: {c: 0}, c: 2}, b: 1}));
});

test('objectDeepStrictLike: {a: {a: 0, b: {c: "0"}}} !== {a: {a: 0, b: {c: 0}, c: 2}, b: 1}', t => {
  t.false(objectDeepStrictLike({a: {a: 0, b: {c: "0"}}})({a: {a: 0, b: {c: 0}, c: 2}, b: 1}));
});

test('objectDeepStrictLike: {a: {a: 0, b: {c: 0}}} !== {a: {a: 0, b: 1, c: 2}, b: 1}', t => {
  t.false(objectDeepStrictLike({a: {a: 0, b: {c: 0}}})({a: {a: 0, b: 1, c: 2}, b: 1}));
});
