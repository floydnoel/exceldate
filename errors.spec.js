const assert = require('assert')
const {
  CallbackError,
  ArgTypeError,
} = require('./errors')

describe('CallbackError', () => {
  const someCallbackError = new CallbackError()
  // console.log(someCallbackError)

  it('should be throwable', () => {
    expect(() => { throw someCallbackError }).toThrow(new CallbackError())
  })

  it('should have code ERR_INVALID_CALLBACK', () => {
    assert.equal(someCallbackError.code, 'ERR_INVALID_CALLBACK')
  })
})

describe('ArgTypeError', () => {
  const someArgTypeError = new ArgTypeError('valid argument')
  // console.log(someArgTypeError)

  it('should be throwable', () => {
    expect(() => { throw someArgTypeError }).toThrow(new ArgTypeError())
  })

  it('should have code ERR_INVALID_ARG_TYPE', () => {
    assert.equal(someArgTypeError.code, 'ERR_INVALID_ARG_TYPE')
  })

  it('should have description property assigned in the constructor', () => {
    assert.equal(someArgTypeError.description, 'valid argument')
  })
})
