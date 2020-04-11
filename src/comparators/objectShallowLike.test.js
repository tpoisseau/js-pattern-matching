import test from 'ava';
import objectShallowLike from "./objectShallowLike.js";

test('objectShallowLike: {a: 0, b: 1} == {a: "0", b: "1", c: "2"}', t => {
  t.true(objectShallowLike({a: 0, b: 1})({a: "0", b: "1", c: "2"}));
});

test('objectShallowLike: {a: 0, b: 1, c: 2} != {a: "0", b: "1"}', t => {
  t.false(objectShallowLike({a: 0, b: 1, c: 2})({a: "0", b: "1"}));
});

test('objectShallowLike: {a: 0, b: 1} != {a: "O", b: "1", c: "2"}', t => {
  t.false(objectShallowLike({a: 0, b: 1})({a: "O", b: "1", c: "2"}));
});

test('objectShallowLike: empty: {} == {a: "0", b: "1", c: "2"}', t => {
  t.true(objectShallowLike({})({a: "0", b: "1", c: "2"}));
});
