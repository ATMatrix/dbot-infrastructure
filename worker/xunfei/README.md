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
const xunfei = require('./worker/xunfei')

const args = {
 question: '你好', // String, the question to ask
}

let result = null
try {
  result = await xunfei(args)
} catch (err) {
  console.log(err)
}

console.log(result)
~~~
