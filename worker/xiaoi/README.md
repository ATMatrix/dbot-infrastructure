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
const xiaoi = require('./worker/xiaoi')

const args = {
  question: '你是谁？', // String, the question to ask
}

let result = null
try {
  result = await xiaoi(args)
} catch (err) {
  console.log(err)
}

console.log(result)
~~~
