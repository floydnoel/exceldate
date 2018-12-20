// errors inspired by node internal errors, located here (2018-12-18):
// https://raw.githubusercontent.com/nodejs/node/master/lib/internal/errors.js

class ArgTypeError extends TypeError {
  constructor(expectedType) {
    super('The first argument must be of expected type')
    this.code = 'ERR_INVALID_ARG_TYPE'
    this.expectedType = expectedType
  }
}

class CallbackError extends TypeError {
  constructor() {
    super('Callback must be a function')
    this.code = 'ERR_INVALID_CALLBACK'
  }
}

module.exports = {
  ArgTypeError,
  CallbackError,
}
