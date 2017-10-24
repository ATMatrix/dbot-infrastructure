# baiduOcr
Method to call baidu Ocr API.
## Installation
~~~shell
cd worker/baiduOcr && npm install
~~~
## Test
First, edit config.json, config with correct info, then run:
~~~
npm test
~~~
## Usage
~~~javascript
const ocr = require('./worker/baiduOcr')

const opts = {
  url: 'http://www.images.com/some_image.jpg', // String, address of the image
  method: 'general', // String, the ocr method to query. Must be one of ['generalBasic', 'general', 'generalEnhance', 'accurateBasic', 'accurate', 'webImage', 'bankcard', 'idcard', 'vehicleLicense', 'drivingLicense', 'licensePlate', 'tableBegin', 'tableRecorgnize', 'receipt', 'businessLicense'], [doc](http://ai.baidu.com/docs#/OCR-Node-SDK/top)
  options: {}, // Object, extra options to call the AI
}

let result = null
try {
  result = await ocr(opts)
} catch (err) {
  console.log(err)
}

console.log(result)
~~~
