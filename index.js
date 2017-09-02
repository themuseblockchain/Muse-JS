var muse = require('./lib/facade');

muse.api = require('./lib/api');
muse.auth = require('./lib/auth');
muse.broadcast = require('./lib/broadcast');
muse.formatter = require('./lib/formatter');
muse.memo = require('./lib/auth/memo');
muse.config = require('./lib/config');

module.exports = muse;
