# aliface
Method to call MicroSoft Azure Vision API.
## Installation
~~~shell
cd worker/azureVision && npm install
~~~
## Test
First, edit config.json, config with correct info, then run:
~~~
npm test
~~~
## Usage
~~~javascript
const AzureVision = require('./worker/azureVision')

const config = {
  KEY: 'xxx',
}

const azureVision = new AzureVision(config)

const args = {
  url: 'http://www.images.com/some_image.jpg', // String, address of the image
  attrs: ['Categories', 'Color'], // Whether or not analyze and return image attributes, default to ['Categories', 'Description', 'Color'], [doc](https://westus.dev.cognitive.microsoft.com/docs/services/56f91f2d778daf23d8ec6739/operations/56f91f2e778daf14a499e1fa)
}

let result = null
try {
  result = await azureVision.query(args)
} catch (err) {
  console.log(err)
}

console.log(result)
~~~
