const unirest = require("unirest");
const version = '1';

const apis = {
    'address':  `/api/${version}/address`,
    'tokens': `/api/${version}/tokens`,
    'channels': `/api/${version}/channels`,
    'events': `/api/${version}/events/channels`,
    'connections': `/api/${version}/connections`,
    'transfers': `/api/${version}/transfers`,
}

const methods = [
    'GET',
    'PUT',
    'POST',
    'PATCH',
    'DELETE',
  ],

var RaidenBilling = function (options) {
    this._url = options.url;

}

RaidenBilling.prototype.address = function address(){
    let req = unirest(methods[0], `${_url}${apis['address']}`)

}

RaidenBilling.prototype.tokens = function tokens(){
    let req = unirest("PUT", "http://raiden.itering.com/api/1/channels")

}



req.headers({
  "postman-token": "0d05e1ba-ae11-3536-31fb-6afe9418b9a4",
  "cache-control": "no-cache",
  "content-type": "application/json"
});

req.type("json");
req.send({
  "partner_address": "0x00a19c89ead706d6b6b99450b7fab48aed724635",
  "token_address": "0x0f114a1e9db192502e7856309cc899952b3db1ed",
  "balance": 77,
  "settle_timeout": 600
});

req.end(function (res) {
  if (res.error) throw new Error(res.error);

  console.log(res.body);
});
