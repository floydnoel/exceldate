/**
 * Created by floyd noel on 1/30/17.
 *
 * TAKES AN EXCEL TIMESTAMP (AS A NUMBER OR A STRING), RETURNS A CORRESPONDING DATE OBJECT
 */
module.exports = (excelTimestamp, callback) => {
  // ENSURE WE HAVE A VALID CALLBACK, OTHERWISE JUST RETURN
  if (!callback || typeof callback !== 'function') {
    callback = (err, res) => {
      return !!err ? null : res
    }
  }
  // ENSURE WE HAVE A TIMESTAMP
  if (!excelTimestamp) {
    return callback(new Error('No first argument provided, there is nothing to convert!'))
  } else {
    try {
      // ENSURE TIMESTAMP IS A NUMBER, BASE 10
      const timestampNumber = Number.parseFloat(excelTimestamp, 10)
      if (Number.isNaN(timestampNumber)) {
        return callback(new Error('First argument provided could not be used as a Number!'))
      } else {
        // APPARENTLY ALL GOOD, CONVERT THE EXCEL TIMESTAMP TO A DATE
        // ALGORITHM DETAILS, AND CF COMMENTS: https://gist.github.com/christopherscott/2782634
        const secondsInDay = 24 * 60 * 60
        const excelEpoch = new Date(Date.UTC(1899, 11, 31))
        const excelEpochAsUnixTimestamp = excelEpoch.getTime()
        const missingLeapYearDay = secondsInDay * 1000
        const delta = excelEpochAsUnixTimestamp - missingLeapYearDay
        const excelTimestampAsUnixTimestamp = timestampNumber * secondsInDay * 1000
        const parsed = excelTimestampAsUnixTimestamp + delta
        const javascriptDate = new Date(parsed)

        return callback(null, javascriptDate)
      }
    } catch (e) {
      return callback(e)
    }
  }
}
