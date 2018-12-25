/**
 * exceldate
 * @module exceldate
 */
const { ArgTypeError, CallbackError } = require('./errors')
const promisify = require('util').promisify

// constants
const numberOrNumberString = 'number or number string'
const dateOrDateString = 'date or date string'

const secondsInDay = 24 * 60 * 60

// calculation details:
// start date of the spreadsheet epic
const sheetEpoch = new Date(Date.UTC(1899, 11, 31))
const sheetEpochTimestamp = sheetEpoch.getTime()
// missingLeapYearDay is due to a bug in Excel.
// todo: add link/more
// this assumes to use the Google format for values <61? todo: recheck
const missingLeapYearDay = secondsInDay * 1000
const adjustedSheetEpicTimestamp = sheetEpochTimestamp - missingLeapYearDay


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

    const fromTimestamp = fromDateNumber * secondsInDay * 1000
    const convertedTimestamp = fromTimestamp + adjustedSheetEpicTimestamp
    const jsDate = new Date(convertedTimestamp)

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

    const convertedTimestamp = toTimestamp - adjustedSheetEpicTimestamp
    const sheetDate = convertedTimestamp / secondsInDay / 1000

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
