import test from 'ava';
import extractValue from "./extractValue.js";

test('extractValue', t => {
  const from = {
    foo: 42,
    bar: 'baz',
    baz: 'foo',
    toto: 'tata',
  };
  
  const extractor = extractValue({
    foo: true,
    bar: false,
    baz: value => value.toto,
    tata: 'foo',
  });
  
  const to = extractor(from);
  
  t.deepEqual(to, {
    foo: 42,
    baz: 'tata',
    tata: 42,
  });
});
