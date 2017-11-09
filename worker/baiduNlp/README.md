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
const nlp = require('./worker/baiduNlp')

const args = {
  text: 'Today is nice!', // String, text to be process(required)
  method: 'sentimentClassify', // String, (default: 'sentimentClassify') nlp method to call. Must be one of ['sentimentClassify'], [doc](http://ai.baidu.com/docs#/NLP-Node-SDK/top)
}

let result = null
try {
  result = await nlp(args)
} catch (err) {
  console.log(err)
}

console.log(result)
~~~
