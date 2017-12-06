# baiduImageCensor
Method to call IBM tone analyze API.
## Installation
~~~shell
cd worker/ibmToneAnalyze && npm install
~~~
## Test
First, edit config.json, config with correct info, then run:
~~~
npm test
~~~
## Usage
~~~javascript
const IbmTone = require('./worker/ibmToneAnalyze')

const config = {
  username: "xxx",
  password: "xxx",
  version_date: "xxx"
}

const tone = new IbmTone(config)

const args = {
  text: 'Today is nice!', // String, text to be process(required)
}

let result = null
try {
  result = await tone.query(args)
} catch (err) {
  console.log(err)
}

console.log(result)
~~~
