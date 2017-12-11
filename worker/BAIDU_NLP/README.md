# baiduImageCensor
Method to call baidu nlp API.
## Installation
~~~shell
cd worker/baiduNlp && npm install
~~~
## Test
First, edit config.json, config with correct info, then run:
~~~
npm test
~~~
## Usage
~~~javascript
const BaiduNlp = require('./worker/baiduNlp')

const config = {
  APP_ID: "xxx",
  API_KEY: "xxx",
  SECRET_KEY: "xxx"
}

const nlp = new BaiduNlp(config)

const args = {
  text: 'Today is nice!', // String, text to be process(required)
  method: 'sentimentClassify', // String, (default: 'sentimentClassify') nlp method to call. Must be one of ['sentimentClassify'], [doc](http://ai.baidu.com/docs#/NLP-Node-SDK/top)
}

let result = null
try {
  result = await nlp.query(args)
} catch (err) {
  console.log(err)
}

console.log(result)
~~~
