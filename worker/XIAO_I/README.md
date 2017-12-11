# xiaoi
Method to call xiaoi AI API.
## Installation
~~~shell
cd worker/xiaoi && npm install
~~~
## Test
First, edit config.json, config with correct info, then run:
~~~
npm test
~~~
## Usage
~~~javascript
const XiaoI = require('./worker/xiaoi')

const config = {
  APP_KEY: "xxx",
  APP_SECRET: "xxx"
}

const xiaoi = new XiaoI(config)

const args = {
  question: '你是谁？', // String, the question to ask
}

let result = null
try {
  result = await xiaoi.query(args)
} catch (err) {
  console.log(err)
}

console.log(result)
~~~
