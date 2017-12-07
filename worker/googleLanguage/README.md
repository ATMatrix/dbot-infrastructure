# GoogleLanguage
Method to call Google Natural Language Analyze API.
## Installation
~~~shell
cd worker/googleLanguage && npm install
~~~
## Test
First, create a google cloud service account for your application and download your key file. Edit config.json, config with key file path, then run:
~~~
npm test
~~~
## Usage
~~~javascript
const GoogleLang = require('./worker/googleLanguage')

const config = {
  keyFilename: '/path/to/service-account-key-file'
}

const lang = new GoogleLang(config)

const args = {
  text: 'Today is nice!', // String, text to be process(required)
}

let result = null
try {
  result = await lang.query(args)
} catch (err) {
  console.log(err)
}

console.log(result)
~~~
