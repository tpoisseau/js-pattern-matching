const throwError = error => () => {
  error = error instanceof Error ? error : new Error(error);

  throw error;
};

export default throwError;