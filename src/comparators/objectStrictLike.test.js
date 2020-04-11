import test from "ava";
import objectStrictLike from "./objectStrictLike.js";

test('objectStrictLike: {a: 0, b: 1} === {a: 0, b: 1, c: 2}', t => {
  t.true(objectStrictLike({a: 0, b: 1})({a: 0, b: 1, c: 2}));
});

test('objectStrictLike: {a: 0, b: 1, c: 2} !== {a: 0, b: 1}', t => {
  t.false(objectStrictLike({a: 0, b: 1, c: 2})({a: 0, b: 1}));
});

test('objectStrictLike: {a: 0, b: 1} !== {a: "0", b: 1, c: "2"}', t => {
  t.false(objectStrictLike({a: 0, b: 1})({a: "0", b: 1, c: "2"}));
});
