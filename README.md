# excelDate
[ ![Codeship Status for floydnoel/exceldate](https://app.codeship.com/projects/362f08b0-c04a-0136-91bf-5a413c092475/status?branch=master)](https://app.codeship.com/projects/313502)

###### Spreadsheet-formatted date conversion utility
The original and most complete npm package to convert spreadsheet-formatted dates, such as those found in Microsoft's Excel and Google's Sheets.

excelDate is tested and maintained! A simple npm module with no dependencies (beyond Node 8+).


## How it works
Spreadsheet software such as Microsoft Excel have a specialized internal date format. A number (integer or float) represents a date, and optionally, a time. An integer represents a date without a time. Floats are used for a date with a time. That number represents the number of days since December 31, 1899 (in the case of MS Excel) or December 30, 1899 (for Google Sheets).


Accepts a spreadsheet-formatted date as a number or stored in a string.

## Todo
- dist
- add spreadsheet examples to test/playground

## Usage
Install it in your project
```bash
yarn add exceldate
# or
npm install exceldate
```

Import and Use it:
```js
const excelDate = require('exceldate')
const { from, to } = require('exceldate')
const { from, to } = require('exceldate/async')

import { from, to } from 'exceldate/async'
import excelDate from 'exceldate'

const jsDate = excelDate.from(4242)
jsDate.getFullYear() // 1911
excelDate.from('1').toISOString() // 1899-12-31T00:00:00.000Z
```

Use it with a Promise:
```js
excelDate
  .fromAsync(42510)
  .then(res => res.toISOString())
  .then(console.log) // 2016-05-20T00:00:00.000Z
  .catch(err => console.error(`[Error]: ${err}`))
```

You can use it with async/await:
```js
const fromAwait = async () => {
  let result = await excelDate.fromAsync(424242)
  console.log(result) // 3061-07-13T00:00:00.000Z
}

fromAwait()
```

You could even use it with a callback if you like:
```js
excelDate.from('9000', (err, res) => {
  if (!err) console.log(res) // 1924-08-21T00:00:00.000Z
  else console.error(`[Error]: ${err}`)
})
```

## Tests

Tests are all located in [`index.spec.js`](https://github.com/floydnoel/exceldate/blob/master/index.spec.js)
and cover the main-file, [`index.js`](https://github.com/floydnoel/exceldate/blob/master/index.js)

#### Prerequisites
- clone/download the repo
- navigate to the repo
- run `yarn` or `npm i`

#### To execute
Run `yarn test` or `npm test`


## Playground
`node playground` to run

## License
This is free and unencumbered software released "as is" into the public domain, without warranty of any kind.
For more information, please refer to the LICENSE file and <https://unlicense.org>


## Changelog
- 2.0.0 Now supports two-way conversions! New API, improved package setup, JSDocs, better README, and other great enhancements.
- 1.0.2 update README
- 1.0.1 remove comment
- 1.0.0 added support callback style interface, testing
- 0.0.3 initial stable version


## Inspiration
How this package came to be is, I needed to convert some data exported as CSVs from Excel for use in a Node backend. A quick Google of "Excel JavaScript Date conversion" turns up a gist [1] from 2012. It contains a basic conversion function which mostly works, but has some issues. Several comments on that Gist expanded on that approach with better self-documentation and leap years accounted for.


## Contributions
PRs welcome, run `yarn format` if you don't mind

## Contributers
- [Floyd Noel](https://github.com/floydnoel)

## Special Thanks To
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

	return new Date((excelDate - (25567 + 1))*86400*1000);

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
