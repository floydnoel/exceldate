const { promisify } = require('util');
const { from, to } = require('./index');

module.exports = {
  from: promisify(from),
  to: promisify(to),
};
