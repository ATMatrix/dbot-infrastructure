# baiduImageCensor
Method to call baidu image cesor API.
## Installation
~~~shell
cd worker/baiduCensor && npm install
~~~
## Test
First, edit config.json, config with correct info, then run:
~~~
npm test
~~~
## Usage
~~~javascript
const censor = require('./worker/baiduCensor')

const args = {
  url: 'http://www.images.com/some_image.jpg', // String, address of the image
  method: 'antiPorn', // String, (default: 'antiPorn') the image cesor method to query. Must be one of ['antiPorn', 'antiPornGif'], [doc](http://ai.baidu.com/docs#/ImageCensoring-Node-SDK/top)
}

let result = null
try {
  result = await censor(args)
} catch (err) {
  console.log(err)
}

console.log(result)
~~~
