import test from "ava";
import shallowEqual from "./shallowEqual.js";

test('shallowEqual: 1 == "1"', t => {
  t.true(shallowEqual(1)('1'));
});

test('shallowEqual: "1" == 1', t => {
  t.true(shallowEqual("1")(1));
});

test('shallowEqual: a != b', t => {
  t.false(shallowEqual('a')('b'));
});
