'use strict';

var muse = require('./facade');
muse.api = require('./api');
muse.auth = require('./auth');
muse.broadcast = require('./broadcast');
muse.formatter = require('./formatter');
muse.memo = require('./auth/memo');
muse.config = require('./config');

if (typeof window !== 'undefined') {
  window.muse = muse;
}

if (typeof global !== 'undefined') {
  global.muse = muse;
}

exports = module.exports = muse;