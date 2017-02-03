/**
 * Created by floyd on 1/30/17.
 */
// import { assert } from 'chai';
const assert = require('assert');
const exceldate = require('./index.js');

describe('exceldate', () => {
  it('should return the correct date', () => {
    assert.equal(
      exceldate(42510).toISOString(),
      "2016-05-20T00:00:00.000Z"
    );
    assert.equal(
      exceldate('42510').toISOString(),
      "2016-05-20T00:00:00.000Z"
    );
    assert.equal(
      exceldate(1).toISOString(),
      "1899-12-31T00:00:00.000Z"
    );
    assert.equal(
      exceldate('1').toISOString(),
      "1899-12-31T00:00:00.000Z"
    );
    assert.equal(
      exceldate(2).toISOString(),
      "1900-01-01T00:00:00.000Z"
    );
    assert.equal(
      exceldate('2').toISOString(),
      "1900-01-01T00:00:00.000Z"
    );
    assert.equal(
      exceldate(4242.4242).toISOString(),
      "1911-08-12T10:10:50.880Z"
    );
    assert.equal(
      exceldate('4242.4242').toISOString(),
      "1911-08-12T10:10:50.880Z"
    );
    assert.equal(
      exceldate(42738.22626859954).toISOString(),
      "2017-01-03T05:25:49.607Z"
    );
    assert.equal(
      exceldate('42738.22626859954').toISOString(),
      "2017-01-03T05:25:49.607Z"
    );
  });

  it('should return null for invalid inputs', () => {
    assert.equal(
      exceldate('foo'),
      null
    );
    assert.equal(
      exceldate(false),
      null
    );
    assert.equal(
      exceldate(),
      null
    );
  });

});