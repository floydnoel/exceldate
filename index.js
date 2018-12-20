/**
 * exceldate
 * @module exceldate
 */
const {
  ArgTypeError,
  CallbackError,
} = require('./errors')
const promisify = require('util').promisify


/**
* Callback definition (standard Node-style error-first callback)
* @callback nodeCallback
* @param {(error|undefined)} err - An error if one is encountered, undefined otherwise
* @param {*} res - The successful result if processed
*/


//todo: double check
/**
 * A default callback for when none is provided. Returns the result or throws any error
 * @param {(Error|undefined)} err - A JS Error object or undefined if no error
 * @param {*} res - The successful return data, assumed undefined if any error
 * @returns {*} - Will be the same as the res param
 * @throws Will throw an error if one is provided as the first/err param
 */
const defaultCallback = (err, res) => {
  if (err) throw err
  return res
}

/**
 * Convert from a spreadsheet-formatted date to a corresponding JS date object
 * @param {(number|string)} fromDate - A spreadsheet-formatted date number
 * @param {nodeCallback} [done] - Optional callback, allows async/promisify
 * @returns {date}
 * @throws Will throw an error if the input is invalid
 */
const from = (fromDate, done = defaultCallback) => {
  if (!done || typeof done !== 'function') {
    throw new CallbackError()
  }

  if (!fromDate && fromDate !== 0) {
    return done(new ArgTypeError('number or number string'))
  }

  try {
    const parsedExcelDate = Number.parseFloat(fromDate, 10)
    if (Number.isNaN(parsedExcelDate)) {
      return done(new ArgTypeError('number or number string'))
    }

    const secondsInDay = 24 * 60 * 60
    const excelEpoch = new Date(Date.UTC(1899, 11, 31))
    const excelEpochAsUnixTs = excelEpoch.getTime()
    const missingLeapYearDay = secondsInDay * 1000
    const delta = excelEpochAsUnixTs - missingLeapYearDay // assumes Google format <60
    const excelTsAsUnixTs =
      parsedExcelDate * secondsInDay * 1000
    const adjustedTs = excelTsAsUnixTs + delta
    const jsDate = new Date(adjustedTs)

    return done(null, jsDate)
  } catch (e) {
    return done(e)
  }
}

const to = (toDate, done = defaultCallback) => {
  if (!done || typeof done !== 'function') {
    throw new CallbackError()
  }

  if (!toDate) {
    return done(new ArgTypeError('date or date string'))
  }

  try {
    const toDateAsTimeStamp = typeof toDate === 'object' && !toDate.getTime ? toDate.getTime() : new Date(toDate).getTime()

    if (!toDateAsTimeStamp || Number.isNaN(toDateAsTimeStamp)) {
      throw new ArgTypeError('date or date string')
    }

    const secondsInDay = 24 * 60 * 60
    const excelEpoch = new Date(Date.UTC(1899, 11, 31))
    const excelEpochAsUnixTs = excelEpoch.getTime()
    const missingLeapYearDay = secondsInDay * 1000
    const delta = excelEpochAsUnixTs - missingLeapYearDay // assumes Google format <60
    const adjustedTs = toDateAsTimeStamp - delta
    const sheetDate = adjustedTs / secondsInDay / 1000

    return done(null, `${sheetDate}`)
  } catch (e) {
    return done(e)
  }
}

module.exports = {
  from,
  to,
  fromAsync: promisify(from),
  toAsync: promisify(to),
}
