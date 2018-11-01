/**
 * Created by floyd noel on 1/30/17.
 */
const assert = require('assert')
const excelDate = require('./index')
const { from, errMsg } = excelDate

describe('excelDate', () => {
  it('should return the correct date', () => {
    assert.equal(from(42510).toISOString(), '2016-05-20T00:00:00.000Z')
    assert.equal(from('42510').toISOString(), '2016-05-20T00:00:00.000Z')
    assert.equal(from(1).toISOString(), '1899-12-31T00:00:00.000Z')
    assert.equal(from('1').toISOString(), '1899-12-31T00:00:00.000Z')
    assert.equal(from(2).toISOString(), '1900-01-01T00:00:00.000Z')
    assert.equal(from('2').toISOString(), '1900-01-01T00:00:00.000Z')
    assert.equal(from(4242.4242).toISOString(), '1911-08-12T10:10:50.880Z')
    assert.equal(from('4242.4242').toISOString(), '1911-08-12T10:10:50.880Z')
    assert.equal(from(42738.22626859954).toISOString(), '2017-01-03T05:25:49.607Z')
    assert.equal(from('42738.22626859954').toISOString(), '2017-01-03T05:25:49.607Z')
  })

  it('should return the correct date via callbacks', () => {
    from(42510, (err, res) => {
      assert.equal(res.toISOString(), '2016-05-20T00:00:00.000Z')
    })
    from('42510', (err, res) => {
      assert.equal(res.toISOString(), '2016-05-20T00:00:00.000Z')
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
    expect(() => from('foo')).toThrow(errMsg)
    expect(() => from(false)).toThrow(errMsg)
    expect(() => from()).toThrow(errMsg)
  })

  it('should return errors for invalid inputs via callback', () => {
    from('foo', (err, res) => {
      assert.equal(null, res)
      assert.equal(err.toString(), `Error: ${errMsg}`)
    })

    from(null, (err, res) => {
      assert.equal(null, res)
      assert.equal(err.toString(), `Error: ${errMsg}`)
    })
  })
})
