/**
 * exceldate
 * @module exceldate
 */
const { ArgTypeError, CallbackError } = require('./errors')

// constants
const numberOrNumberString = 'number or number string'
const dateOrDateString = 'date or date string'
const msInDay = 24 * 60 * 60 * 1000

// start date of the spreadsheet epic
// this assumes to use the Google format for values <61? todo: recheck
const sheetEpochTimestamp = new Date('1899-12-30').getTime()
// todo: add link/more
// Excel thinks there's a leap year in 1900, but there isn't.
// Also Excel doesn't allow negative values.

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
 * @throws Will throw an error if the input is invalid, or a bad callback is received
 */
const from = (fromDate, done = defaultCallback) => {
  if (!done || typeof done !== 'function') {
    throw new CallbackError()
  }

  if (!fromDate && fromDate !== 0) {
    return done(new ArgTypeError(numberOrNumberString))
  }

  try {
    const fromDateNumber = Number.parseFloat(fromDate, 10)
    if (Number.isNaN(fromDateNumber)) {
      return done(new ArgTypeError(numberOrNumberString))
    }

    const fromTimestamp = fromDateNumber * msInDay
    const jsTimestamp = fromTimestamp + sheetEpochTimestamp
    const jsDate = new Date(jsTimestamp)

    return done(null, jsDate)
  } catch (e) {
    return done(e)
  }
}

/**
 * Convert to a spreadsheet-formatted date from a corresponding parsable date
 * @param {date|string|number} toDate - A valid JS date object or parsable string/number
 * @param {nodeCallback} [done] - Optional callback, allows async/promisify
 * @returns {string}
 * @throws Will throw an error if the input is invalid, or a bad callback is received
 */
const to = (toDate, done = defaultCallback) => {
  if (!done || typeof done !== 'function') {
    throw new CallbackError()
  }

  if (!toDate && toDate !== 0) {
    return done(new ArgTypeError(dateOrDateString))
  }

  try {
    const toTimestamp =
      typeof toDate === 'object' && !toDate.getTime
        ? toDate.getTime()
        : new Date(toDate).getTime()

    if (!toTimestamp || Number.isNaN(toTimestamp)) {
      throw new ArgTypeError(dateOrDateString)
    }

    const sheetTimestamp = toTimestamp - sheetEpochTimestamp
    const sheetDate = sheetTimestamp / msInDay

    return done(null, `${sheetDate}`)
  } catch (e) {
    return done(e)
  }
}

module.exports = {
  from,
  to,
}
