# AwsRekognition
Method to call AWS Rekognition.recognizeCelebrities API.

## Installation
~~~shell
cd worker/awsRekognition && npm install
~~~

## Config
* First, create an aws access key
* Config access key and region into your config.json

## Test
After config, just run to make a test:
~~~
npm test
~~~

## Usage
~~~javascript
const AwsRekognition = require('./worker/awsRekognition')

const config = {
  region: 'xxx',
  accessKeyId: 'xxx',
  secretAccessKey: 'xxx'
}

const rek = new AwsRekognition(config)

const args = {
  url: 'http://some.image.url', // String, the image address to be process(required)
}

let result = null
try {
  result = await rek.query(args)
} catch (err) {
  console.log(err)
}

console.log(result)
~~~
