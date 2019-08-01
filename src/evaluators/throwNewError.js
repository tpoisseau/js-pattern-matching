const throwNewError = ErrorClass => value => {
  throw new ErrorClass(value);
};

export default throwNewError;