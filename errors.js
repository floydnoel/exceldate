// Errors inspired by node internal errors.
// Located here (as of 2018-12-18):
// https://raw.githubusercontent.com/nodejs/node/master/lib/internal/errors.js

// To use, pass the constructor your desired type, as a {string} description
// example: throw new ArgError('expected a number')
// another: throw new ArgError('a power of two')
class ArgError extends TypeError {
  constructor(description = 'unspecified argument type') {
    super('Bad input (unparseable argument encountered)');
    this.code = 'ERR_INVALID_ARG_TYPE';
    this.description = description;
  }
}

// To use, throw when you have an invalid callback, like so:
// example: throw new CallbackError()
// class CallbackError extends TypeError {
//   constructor(description) {
//     super('done is not a function')
//     this.code = 'ERR_INVALID_CALLBACK'
//   }
// }

module.exports = {
  ArgError,
  // CallbackError,
};
