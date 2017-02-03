# exceldate

A node.js package to convert excel timestamps to JS dates. A simple utility function with no dependencies, exceldate accepts a number directly or stored in a string. 


## Installation

```bash
$ npm install exceldate
```


## Usage

Check it out:
```js
const exceldate = require('exceldate');
console.log(exceldate('1')); // 1899-12-31T00:00:00.000Z 
console.log(exceldate(4242.4242)); // 1911-08-12T10:10:50.880Z 
console.log(exceldate('foo')); // null 
```

## Testing

If you'd like to test, clone or download the repo and run `npm test`, which will run the tests and generate a coverage report.


## License

This is free and unencumbered software released "as is" into the public domain, without warranty of any kind.
For more information, please refer to the LICENSE file and <https://unlicense.org>