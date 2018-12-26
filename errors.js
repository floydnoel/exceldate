// Error codes were inspired by node internal errors.
// Node defines a nearly identical error for invalid callbacks.
// Located here (as of 2018-12-18):
// https://raw.githubusercontent.com/nodejs/node/master/lib/internal/errors.js

// Node uses helpers to create errors from definitions such as:
// E('ERR_INVALID_CALLBACK', 'Callback must be a function', TypeError);
// This will create a new TypeError with a code of ERR_INVALID_CALLBACK.
// That apporach was a neat way to allow error testing and shared errors.
// I tried to replicate it, but it was a lot of work.
// So, I used some of the strings to extend JS Error classes.
// Extending error types means the stack is preserved automatically...
// ...and the code is qute concise.

// todo: jsdoc
// nb: pass the constructor your desired type, as a {string} description
// ex: throw new ArgTypeError('Number')
// or: throw new ArgTypeError('a power of two')
// default description (if undefined) will be `undefined`
class ArgTypeError extends TypeError {
  constructor(description) {
    super('The first argument must be of an expected type')
    this.code = 'ERR_INVALID_ARG_TYPE'
    this.description = description
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
