# xunfei
Method to call xunfei API.
## Installation
~~~shell
cd worker/xunfei && npm install
~~~
## Test
First, edit config.json, config with correct info, then run:
~~~
npm test
~~~
## Usage
~~~javascript
const XunFei = require('./worker/xunfei')

const config = {
  APP_ID: "xxx",
  APP_KEY: "xxx"
}

const xunfei = new XunFei(config)

const args = {
 question: '你好', // String, the question to ask
}

let result = null
try {
  result = await xunfei.query(args)
} catch (err) {
  console.log(err)
}

console.log(result)
~~~
