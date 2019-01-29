const {
  from,
  to,
} = require('./index')

const promisify = require('util').promisify

module.exports = {
  from: promisify(from),
  to: promisify(to),
}
