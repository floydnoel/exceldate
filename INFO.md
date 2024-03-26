## Usage (old, TODO: verify nothing missed)

Check it out:

```js
const exceldate = require('exceldate')
// Use it directly:
const result = exceldate('1').toISOString(); // 1899-12-31T00:00:00.000Z
const anotherResult = exceldate(4242.4242).toISOString(); // 1911-08-12T10:10:50.880Z

// Use it with a callback:
exceldate(9000, (err, res) => {
  if (!err) console.log(res.toISOString()) // 1924-08-21T00:00:00.000Z
});

// Note: the standard callback enables easy use with promise & async when desired.
// First, import util and promisify exceldate.
const util = require('util');
const exceldateAsync = util.promisify(exceldate);
// Then, use like a regular promise...
const exceldateAsync(9000).then(console.log).catch(console.error);
// ...or await the result when in async contexts.
const result = await exceldateAsync(9000);
```

## Inspiration

How this package came to be is, I needed to convert some data exported as CSVs from Excel for use in a Node backend. A quick Google of "Excel JavaScript Date conversion" turns up a gist [1] from 2012. It contains a basic conversion function which mostly works, but has some issues. Several comments on that Gist expanded on that approach with better self-documentation and leap years accounted for.

## Special Thanks (built on work published by)

- [Christopher Scott Hernandez](https://github.com/christopherscott)
- [Oliver Joseph Ash](https://github.com/OliverJAsh)

## References

[1] https://gist.github.com/christopherscott/2782634

```js
// Convert Excel dates into JS date objects
//
// @param excelDate {Number}
// @return {Date}

function getJsDateFromExcel(excelDate) {
  // JavaScript dates can be constructed by passing milliseconds
  // since the Unix epoch (January 1, 1970) example: new Date(12312512312);

  // 1. Subtract number of days between Jan 1, 1900 and Jan 1, 1970, plus 1 (Google "excel leap year bug")
  // 2. Convert to milliseconds.

  return new Date((excelDate - (25567 + 1)) * 86400 * 1000);
}
```

[2] https://gist.github.com/christopherscott/2782634#gistcomment-1808487

```js
export const parseDateExcel = (excelTimestamp) => {
  const secondsInDay = 24 * 60 * 60;
  const excelEpoch = new Date(1899, 11, 31);
  const excelEpochAsUnixTimestamp = excelEpoch.getTime();
  const missingLeapYearDay = secondsInDay * 1000;
  const delta = excelEpochAsUnixTimestamp - missingLeapYearDay;
  const excelTimestampAsUnixTimestamp = excelTimestamp * secondsInDay * 1000;
  const parsed = excelTimestampAsUnixTimestamp + delta;
  return isNaN(parsed) ? null : parsed;
};
```
