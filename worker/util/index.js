'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _billingScriptsBlockchainJson = require('../../billing/scripts/blockchain.json');

var _billingScriptsBlockchainJson2 = _interopRequireDefault(_billingScriptsBlockchainJson);

var ENV = process.env.NODE_ENV;

exports['default'] = {
  blockchain: _billingScriptsBlockchainJson2['default'][ENV]
};
module.exports = exports['default'];