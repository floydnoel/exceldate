const assert = require('assert')

const {
  CallbackError,
  ArgTypeError,
} = require('./errors')

describe('Custom errors', () => {
  it('should test CallbackError', () => {
    // console.log(new CallbackError())
    expect(() => { throw new CallbackError() }).toThrow(new CallbackError())
  })

  it('should test default ArgTypeError', () => {
    // console.log(new ArgTypeError())
    expect(() => { throw new ArgTypeError() }).toThrow(new ArgTypeError())
  })

  it('should test custom ArgTypeError', () => {
    // console.log(new ArgTypeError('foo'))
    expect(() => { throw new ArgTypeError('foo') }).toThrow(new ArgTypeError('foo'))
  })
})
