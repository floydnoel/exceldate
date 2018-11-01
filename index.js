/**
 * exceldate
 * @module exceldate
 */

const errMsg = 'Bad input received, cannot convert'
const promisify = require('util').promisify

/**
* Global callback definition (standard Node-style)
* @callback nodeCallback
* @param {error} err - An error if one is encountered
* @param {*} res - The successful result if processed
*/

/**
 * Convert from an MS Excel-formatted date to a corresponding JS date object
 * @param {(number|string)} excelDate - An excel-formatted date number
 * @param {nodeCallback} [done] - A callback to use if desired
 * @returns {date}
 * @throws Will throw an error if the input is invalid
 */
const from = (excelDate, done) => {
  // Check for a callback. If none, create our own to return the results
  if (!done || typeof done !== 'function') {
    done = (err, res) => {
      if (err) throw err
      return res
    }
  }

  // Check if the input exists
  if (!excelDate && excelDate !== 0) {
    return done(new Error(errMsg))
  }

  try {
    // Check if the input is a parsable Number, base 10
    const parsedExcelDate = Number.parseFloat(excelDate, 10)
    if (Number.isNaN(parsedExcelDate)) {
      return done(new Error(errMsg))
    } else {
      // The input is indeed a parsable number, proceed to conversion
      // For algorithm details see the README
      const secondsInDay = 24 * 60 * 60
      const excelEpoch = new Date(Date.UTC(1899, 11, 31))
      const excelEpochAsUnixTimestamp = excelEpoch.getTime()
      const missingLeapYearDay = secondsInDay * 1000
      const delta = excelEpochAsUnixTimestamp - missingLeapYearDay
      const excelTimestampAsUnixTimestamp =
        parsedExcelDate * secondsInDay * 1000
      const parsed = excelTimestampAsUnixTimestamp + delta
      const jsDate = new Date(parsed)

      return done(null, jsDate)
    }
  } catch (e) {
    return done(e)
  }
}

const to = (a, b) => 'a'

module.exports = {
  from,
  to,
  fromSync: promisify(from),
  toSync: promisify(to),
  errMsg,
}
