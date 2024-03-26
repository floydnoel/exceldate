const assert = require('assert');
const { ArgError } = require('./errors');

describe('ArgError', () => {
  const someArgError = new ArgError('SOME_DESCRIPTION');

  it('should be throwable', () => {
    expect(() => {
      throw someArgError;
    }).toThrow(new ArgError());
  });

  it('should have code ERR_INVALID_ARG_TYPE', () => {
    assert.equal(someArgError.code, 'ERR_INVALID_ARG_TYPE');
  });

  it('should have description property assigned in the constructor', () => {
    assert.equal(someArgError.description, 'SOME_DESCRIPTION');
  });
});
