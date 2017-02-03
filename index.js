/**
 * Created by floyd on 1/30/17.
 *
 * TAKES AN EXCEL TIMESTAMP (AS A NUMBER OR A STRING), RETURNS A CORRESPONDING DATE OBJECT
 */
module.exports = excelTimestamp => {
  // ENSURE WE HAVE A TIMESTAMP
  if (!excelTimestamp) {
    return null;
  } else {
    // ENSURE TIMESTAMP IS A NUMBER, BASE 10
    const timestampNumber = Number.parseFloat(excelTimestamp, 10);
    if (Number.isNaN(timestampNumber)) {
      return null;
    } else {
      // EVERYTHING'S GOOD, CONVERT THE EXCEL TIMESTAMP TO A DATE
      // ALGORITHM DETAILS, cf comments: https://gist.github.com/christopherscott/2782634
      const secondsInDay = 24 * 60 * 60;
      const excelEpoch = new Date(Date.UTC(1899, 11, 31));
      const excelEpochAsUnixTimestamp = excelEpoch.getTime();
      const missingLeapYearDay = secondsInDay * 1000;
      const delta = excelEpochAsUnixTimestamp - missingLeapYearDay;
      const excelTimestampAsUnixTimestamp = timestampNumber * secondsInDay * 1000;
      const parsed = excelTimestampAsUnixTimestamp + delta;

      return new Date(parsed);
    }
  }
};