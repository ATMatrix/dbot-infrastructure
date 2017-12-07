'use strict';
var blockchain = require('../../billing/scripts/blockchain.json');

var ENV = process.env.NODE_ENV;

module.exports = blockchain[ENV];

