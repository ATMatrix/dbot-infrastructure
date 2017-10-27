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

const args = {
  url: 'http://www.images.com/some_image.jpg', // String, address of the image
  attrs: ['age', 'smiling'], // Whether or not detect and return face attributes, default to ['age', 'smiling', 'eyestatus', 'emotion', 'beauty'], [doc](https://console.faceplusplus.com/documents/5679127)
}

let result = null
try {
  result = await aliface(args)
} catch (err) {
  console.log(err)
}

console.log(result)
~~~
