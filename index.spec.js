const assert = require('assert')
const { ArgTypeError, CallbackError } = require('./errors')
const excelDate = require('./index')
const { from, to } = excelDate

describe('from', () => {
  it('should return the correct date', () => {
    assert.equal(from(42510).toISOString(), '2016-05-20T00:00:00.000Z')
    assert.equal(from('42510').toISOString(), '2016-05-20T00:00:00.000Z')
    assert.equal(from(0).toISOString(), '1899-12-30T00:00:00.000Z')
    assert.equal(from('0').toISOString(), '1899-12-30T00:00:00.000Z')
    assert.equal(from(1).toISOString(), '1899-12-31T00:00:00.000Z')
    assert.equal(from('1').toISOString(), '1899-12-31T00:00:00.000Z')
    assert.equal(from(2).toISOString(), '1900-01-01T00:00:00.000Z')
    assert.equal(from('2').toISOString(), '1900-01-01T00:00:00.000Z')
    assert.equal(from(4242.4242).toISOString(), '1911-08-12T10:10:50.880Z')
    assert.equal(from('4242.4242').toISOString(), '1911-08-12T10:10:50.880Z')
    assert.equal(
      from(42738.22626859954).toISOString(),
      '2017-01-03T05:25:49.607Z'
    )
    assert.equal(
      from('42738.22626859954').toISOString(),
      '2017-01-03T05:25:49.607Z'
    )
  })

  it('should return the correct date via callbacks', () => {
    from(42510, (err, res) => {
      assert.equal(res.toISOString(), '2016-05-20T00:00:00.000Z')
    })
    from('42510', (err, res) => {
      assert.equal(res.toISOString(), '2016-05-20T00:00:00.000Z')
    })
    from(0, (err, res) => {
      assert.equal(res.toISOString(), '1899-12-30T00:00:00.000Z')
    })
    from('0', (err, res) => {
      assert.equal(res.toISOString(), '1899-12-30T00:00:00.000Z')
    })
    from(1, (err, res) => {
      assert.equal(res.toISOString(), '1899-12-31T00:00:00.000Z')
    })
    from('1', (err, res) => {
      assert.equal(res.toISOString(), '1899-12-31T00:00:00.000Z')
    })
    from(2, (err, res) => {
      assert.equal(res.toISOString(), '1900-01-01T00:00:00.000Z')
    })
    from('2', (err, res) => {
      assert.equal(res.toISOString(), '1900-01-01T00:00:00.000Z')
    })
    from(4242.4242, (err, res) => {
      assert.equal(res.toISOString(), '1911-08-12T10:10:50.880Z')
    })
    from('4242.4242', (err, res) => {
      assert.equal(res.toISOString(), '1911-08-12T10:10:50.880Z')
    })
    from(42738.22626859954, (err, res) => {
      assert.equal(res.toISOString(), '2017-01-03T05:25:49.607Z')
    })
    from('42738.22626859954', (err, res) => {
      assert.equal(res.toISOString(), '2017-01-03T05:25:49.607Z')
    })
  })

  it('should throw errors for invalid inputs', () => {
    expect(() => from('foo')).toThrow()
    expect(() => from(false)).toThrow()
    expect(() => from()).toThrow()
  })

  it('should return errors for invalid inputs via error parameter of a callback', () => {
    from('foo', (err, res) => {
      assert.equal(null, res)
      assert.equal(err.toString(), new ArgTypeError().toString())
    })

    from(undefined, (err, res) => {
      assert.equal(null, res)
      assert.equal(err.toString(), new ArgTypeError().toString())
    })

    from(null, (err, res) => {
      assert.equal(null, res)
      assert.equal(err.toString(), new ArgTypeError())
    })
  })

  it('should throw an invalid callback error for invalid callbacks', () => {
    expect(() => from('foo', 'bar')).toThrow(new CallbackError())
    expect(() => from(1, 2)).toThrow(new CallbackError())
  })
})

describe('to', () => {
  it('should return the correct date when passed an ISO string', () => {
    assert.equal(to('2016-05-20T00:00:00.000Z'), '42510')
    assert.equal(to('1899-12-30T00:00:00.000Z'), '0')
    assert.equal(to('1899-12-31T00:00:00.000Z'), '1')
    assert.equal(to('1900-01-01T00:00:00.000Z'), '2')
    assert.equal(to('1911-08-12T10:10:50.880Z'), '4242.4242')
    assert.equal(to('2017-01-03T05:25:49.607Z'), '42738.22626859954')
  })

  it('should return the correct date when passed an object', () => {
    assert.equal(to(new Date('2016-05-20T00:00:00.000Z')), '42510')
    assert.equal(to(new Date('1899-12-30T00:00:00.000Z')), '0')
    assert.equal(to(new Date('1899-12-31T00:00:00.000Z')), '1')
    assert.equal(to(new Date('1900-01-01T00:00:00.000Z')), '2')
    assert.equal(to(new Date('1911-08-12T10:10:50.880Z')), '4242.4242')
    assert.equal(to(new Date('2017-01-03T05:25:49.607Z')), '42738.22626859954')
  })

  it('should return the correct date via callbacks', () => {
    to('2016-05-20T00:00:00.000Z', (err, res) => {
      assert.equal(res, '42510')
    })
    to('1899-12-30T00:00:00.000Z', (err, res) => {
      assert.equal(res, '0')
    })
    to('1899-12-31T00:00:00.000Z', (err, res) => {
      assert.equal(res, '1')
    })
    to('1900-01-01T00:00:00.000Z', (err, res) => {
      assert.equal(res, '2')
    })
    to('1911-08-12T10:10:50.880Z', (err, res) => {
      assert.equal(res, '4242.4242')
    })
    to('2017-01-03T05:25:49.607Z', (err, res) => {
      assert.equal(res, '42738.22626859954')
    })
  })

  it('should throw errors for invalid inputs', () => {
    expect(() => to('foo')).toThrow()
    expect(() => to(false)).toThrow()
    expect(() => to()).toThrow()
  })

  it('should return errors for invalid inputs via error parameter of a callback', () => {
    to('foo', (err, res) => {
      assert.equal(null, res)
      assert.equal(err.toString(), new ArgTypeError().toString())
    })

    to(undefined, (err, res) => {
      assert.equal(null, res)
      assert.equal(err.toString(), new ArgTypeError().toString())
    })

    to(null, (err, res) => {
      assert.equal(null, res)
      assert.equal(err.toString(), new ArgTypeError())
    })
  })

  it('should throw an invalid callback error for invalid callbacks', () => {
    expect(() => to('foo', 'bar')).toThrow(new CallbackError())
    expect(() => to(1, 2)).toThrow(new CallbackError())
  })
})
