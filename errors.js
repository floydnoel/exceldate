// Errors inspired by node internal errors.
// Located here (as of 2018-12-18):
// https://raw.githubusercontent.com/nodejs/node/master/lib/internal/errors.js

// To use, pass the constructor your desired type, as a {string} description
// example: throw new ArgTypeError('Number')
// another: throw new ArgTypeError('a power of two')
class ArgTypeError extends TypeError {
  constructor(description) {
    super('The first argument must be of an expected type')
    this.code = 'ERR_INVALID_ARG_TYPE'
    this.description = description
  }
}

// To use, throw when you have an invalid callback, like so:
// example: throw new CallbackError()
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
