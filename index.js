/**
 * @callback nodeCallback
 * @param {Error} [err]
 * @param {Date} [res]
 */

/**
 * Takes an Excel timestamp (as a number or string) and returns a corresponding Date object
 * @param {string|number} excelDate
 * @param {nodeCallback} [done]
 */
module.exports = (
  excelDate,
  done = (err, res) => {
    if (err) throw err
    return res
  }
) => {
  if (!excelDate) {
    return done(new Error('No first argument provided, nothing to convert.'))
  }
  try {
    // Convert input to a number
    const excelDateNumber = Number.parseFloat(excelDate, 10)
    if (Number.isNaN(excelDateNumber)) {
      return done(new Error('First argument could not be parsed.'))
    }

    // Convert input to JS Date
    // Details here (mostly in comments): https://gist.github.com/christopherscott/2782634
    const secondsInDay = 24 * 60 * 60
    const excelEpoch = new Date(Date.UTC(1899, 11, 31))
    const excelEpochTs = excelEpoch.getTime()
    const missingLeapYearDay = secondsInDay * 1000

    const excelDelta = excelEpochTs - missingLeapYearDay
    const excelTs = excelDateNumber * secondsInDay * 1000
    const unixTs = excelTs + excelDelta
    const jsDate = new Date(unixTs)

    return done(null, jsDate)
  } catch (e) {
    return done(e)
  }
}
