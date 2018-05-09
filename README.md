# exceldate

A node.js package to convert excel timestamps to JS dates. A simple utility function with no dependencies, exceldate accepts a number directly or stored in a string.


## Installation

```bash
$ yarn add exceldate
$ # or
$ npm install exceldate
```


## Usage

Check it out:
```js
const exceldate = require('exceldate')

// use it directly
console.log(exceldate('1').toISOString()) // 1899-12-31T00:00:00.000Z
console.log(exceldate(4242.4242).toISOString()) // 1911-08-12T10:10:50.880Z

// or use it with a callback
exceldate(9000, (err, res) => {
  if (!err) console.log(res.toISOString()) // 1924-08-21T00:00:00.000Z
})
```

## Testing

Prerequisites:
- clone/download the repo
- install Jest e.g. `npm i -g jest`
- navigate to the repo

Then just run `npm test` or `jest`


## License

This is free and unencumbered software released "as is" into the public domain, without warranty of any kind.
For more information, please refer to the LICENSE file and <https://unlicense.org>


## Changelog:
- 0.0.3 First stable version
- 1.0.0 support callback style interface, remove semicolons, updated test framework, updated README
- 1.0.1 remove errant comment
