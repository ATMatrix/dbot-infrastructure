# baiduImageClassify
Method to call baidu ImageClassify API.
## Installation
~~~shell
cd worker/baiduImageClassify && npm install
~~~
## Test
First, edit config.json, config with correct info, then run:
~~~
npm test
~~~
## Usage
~~~javascript
const imageClassify = require('./worker/baiduImageClassify')

const opts = {
  url: 'http://www.images.com/some_image.jpg', // String, address of the image
  method: 'general', // String, the image classify method to query. Must be one of ['dishDetect', 'carDetect', 'logoSearch', 'animalDetect', 'plantDetect', 'objectDetect'], [doc](http://ai.baidu.com/docs#/ImageClassify-Node-SDK/top)
  options: {}, // Object, extra options to call the AI
}

let result = null
try {
  result = await imageClassify(opts)
} catch (err) {
  console.log(err)
}

console.log(result)
~~~
