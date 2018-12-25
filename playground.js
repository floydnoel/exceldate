#!node -i

// This "playground" was added to make it easy to start experimenting
// with the usage of this package.
// This script can be run directly in your shell if Node is installed,
// e.g. `$ ./playground.js`

const excelDate = require('./index')

console.log(excelDate.from(0).toISOString())

try {
  console.log(excelDate.from('🖖').getFullYear())
} catch (err) {
  console.error(`[Caught Error]: ${err}`)
}

excelDate.from('1', (err, res) => {
  if (!err) console.log(res)
  else console.error(`[Caught Error]: ${err}`)
})

excelDate.from('60', (err, res) => {
  if (!err) console.log(res)
  else console.error(`[Caught Error]: ${err}`)
})

excelDate
  .fromAsync(42510)
  .then(r => r.toISOString())
  .then(console.log)
  .catch(err => console.error(`[Caught Error]: ${err}`))

// const fromAwait = async () => {
//   let result
//   try {
//     result = await excelDate.fromAsync(424242)
//   } catch (err) {
//     console.error(`[Caught Error]: ${err}`)
//   }
//   console.log(result)
// }
//
// fromAwait()

const fromAwait = async () => {
  let result = await excelDate.fromAsync('424242')
  console.log(result) // 3061-07-13T00:00:00.000Z
}

fromAwait()
