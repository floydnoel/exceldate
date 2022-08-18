/**
 * exceldate
 * @module exceldate
 */
const { ArgTypeError, CallbackError } = require('./errors')

// constants
const numberOrNumberString = 'number or number string'
const dateOrDateString = 'date or date string'
const msInDay = 24 * 60 * 60 * 1000

// Start of the spreadsheet epic as a timestamp
// Technically this can be one of two values. This is the one Google chose.
const sheetEpochTimestamp = new Date('1899-12-30').getTime()

/**
 * Node.js-style error-first callback.
 * @callback errorFirstCallback
 * @param {(Error|null|undefined)} err - An error if one is encountered, null/undefined otherwise.
 * @param {*} res - The successful result if processed.
 */

/**
 * A callback for when none is provided, just to return the result or throw any error.
 * @param {(Error|null|undefined)} err - A JavaScript Error object or null/undefined.
 * @param {*} res - The successful return data, assumed undefined if any error.
 * @returns {*} Will be whatever is passed as the res param.
 * @throws Will throw an error if one is provided as the first/err param.
 */
const closer = (err, res) => {
  if (err) throw err
  return res
}

/**
 * Convert from a spreadsheet-formatted date to a corresponding JavaScript Date object.
 * @param {(number|string)} fromValue - A spreadsheet-formatted date (a number, optionally contained in a string).
 * @param {errorFirstCallback} [done] - Optional callback, enables async/promisify.
 * @returns {date}
 * @throws Will throw an error if the input is invalid, or a bad callback is received.
 */
module.exports.from = (fromValue, done = closer) => {
  if (!done || typeof done !== 'function') {
    throw new CallbackError()
  }

  if (!fromValue && fromValue !== 0) {
    return done(new ArgTypeError(numberOrNumberString))
  }

  try {
    const fromValueNumber = Number.parseFloat(fromValue, 10)
    if (Number.isNaN(fromValueNumber)) {
      return done(new ArgTypeError(numberOrNumberString))
    }

    const fromTimestamp = fromValueNumber * msInDay
    const jsTimestamp = fromTimestamp + sheetEpochTimestamp
    const jsDate = new Date(jsTimestamp)

    return done(null, jsDate)
  } catch (e) {
    return done(e)
  }
}

/**
 * Convert to a spreadsheet-formatted date from a corresponding parsable date.
 * @param {date|string|number} toValue - A valid JavaScript Date object or a date-parsable string or number.
 * @param {errorFirstCallback} [done] - Optional callback, enables async/promisify.
 * @returns {string}
 * @throws Will throw an error if the input is invalid, or a bad callback is received.
 */
module.exports.to = (toValue, done = closer) => {
  if (!done || typeof done !== 'function') {
    throw new CallbackError()
  }

  if (!toValue && toValue !== 0) {
    return done(new ArgTypeError(dateOrDateString))
  }

  try {
    const toTimestamp = new Date(toValue).getTime()

    if (Number.isNaN(toTimestamp)) {
      throw new ArgTypeError(dateOrDateString)
    }

    const sheetTimestamp = toTimestamp - sheetEpochTimestamp
    const sheetDate = sheetTimestamp / msInDay

    return done(null, `${sheetDate}`)
  } catch (e) {
    return done(e)
  }
};
