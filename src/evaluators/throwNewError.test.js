import test from 'ava';
import throwNewError from "./throwNewError.js";

test('throwNewError', t => {
  const newErrorFactory = throwNewError(TypeError);
  
  t.throws(() => newErrorFactory('ErrorMessage'), {
    instanceOf: TypeError,
    message: 'ErrorMessage',
  })
});
