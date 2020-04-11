import test from 'ava';
import haveKeys from "./haveKeys.js";

test('haveKeys single: bar in {bar}', t => {
  t.true(haveKeys('bar')({bar: 0}));
});

test('haveKeys single: foo not in {bar}', t => {
  t.false(haveKeys('foo')({bar: 0}));
});

test('haveKeys multiple: foo, bar in {foo, bar}', t => {
  t.true(haveKeys('foo', 'bar')({foo: 0, bar: 0}));
});

test('haveKeys multiple: foo, bar in {foo, bar, baz}', t => {
  t.true(haveKeys('foo', 'bar')({foo: 0, bar: 0, baz: 0}));
});

test('haveKeys multiple: foo, bar not in {foo}', t => {
  t.false(haveKeys('foo', 'bar')({foo: 0}));
});
