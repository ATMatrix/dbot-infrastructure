# aliface
Method to call ali face++ API.
## Installation
~~~shell
cd worker/aliface && npm install
~~~
## Test
First, edit config.json, config with correct info, then run:
~~~
npm test
~~~
## Usage
~~~javascript
const aliface = require('./worker/aliface')

const url = 'http://www.images.com/some_image.jpg', // String, address of the image
const opts = {
  attrs: ['age', 'smiling'], // Whether or not detect and return face attributes, default to ['age', 'smiling', 'eyestatus', 'emotion', 'beauty'], [doc](https://console.faceplusplus.com/documents/5679127)
} // Object, extra options to call the AI

let result = null
try {
  result = await aliface(url, opts)
} catch (err) {
  console.log(err)
}

console.log(result)
~~~
