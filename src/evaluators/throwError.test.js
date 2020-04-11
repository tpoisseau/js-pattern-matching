import test from 'ava'
import throwError from "./throwError.js";

test('throwError: with string', t => {
  const factoryError = throwError('with string');
  
  t.throws(factoryError, {
    instanceOf: Error,
    message: 'with string',
  });
});

test('throwError: with instanciated error', t => {
  const factoryError = throwError(new TypeError('ParentScope'));
  
  t.throws(factoryError, {
    instanceOf: TypeError,
    message: 'ParentScope',
  });
});


