import test from 'ava';
import returnValue from "./returnValue.js";

test('returnValue: returnValue(50)() === 50', t => {
  t.is(returnValue(50)(), 50);
});

test('returnValue: returnValue("60")(50) === "60"', t => {
  t.is(returnValue('60')(50), '60');
});

test('returnValue: returnValue({})() === {}', t => {
  const ref = {};
  
  t.is(returnValue(ref)(), ref);
});

test('returnValue: returnValue({}).call(test) === {}', t => {
  const ref = {};
  
  t.is(returnValue(ref).call(test), ref);
});

test('returnValue: returnValue(function).call(test) === function', t => {
  function ref() {
  
  }
  
  t.is(returnValue(ref).call(test), ref);
});
