#!node -i
/* eslint-disable no-console */

// This "playground" was added to make it easy to start experimenting
// with the usage of this package.
// This script can be run directly in your shell if Node is installed,
// e.g. `./playground.js`, or `node playground`

const { from, to } = require('./index');
const excelDate = require('./async');

console.log(from(0).toISOString());
console.log(to('1900-01-01').toString());

try {
  console.log(from('🖖').getFullYear());
} catch (err) {
  console.error(`Playground Caught Error ->`);
  console.error(err);
}

from('1', (err, res) => {
  if (!err) console.log(res);
  else console.error(`Error -> ${err}`);
});

from('60', (err, res) => {
  if (!err) console.log(res);
  else console.error(`Error -> ${err}`);
});

from('61', (err, res) => {
  if (!err) console.log(res);
  else console.error(`Error -> ${err}`);
});

excelDate
  .from(42510)
  .then((r) => r.toISOString())
  .then(console.log)
  .catch((err) => console.error(`.catch Error -> ${err}`));

excelDate
  .to('&')
  .then((r) => r.toISOString())
  .then(console.log)
  .catch((err) => {
    console.error(`Playground .catch Error ->`);
    console.error(err);
  });

const fromAwait = async () => {
  const result = await excelDate.from('424242');
  console.log(result); // 3061-07-13T00:00:00.000Z
};

fromAwait();
