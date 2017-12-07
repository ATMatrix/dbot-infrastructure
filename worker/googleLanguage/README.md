# GoogleLanguage
Method to call Google Natural Language Analyze API.
## Installation
~~~shell
cd worker/googleLanguage && npm install
~~~
## Config
* First, create a google cloud service account for your application
* Download your key file
* Config authentication key by one of following ways:
1. Edit config.json, add the field `keyFilename: '/path/to/service-account-key-file'`
2. Export key file path to environment by `export GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account-key-file`

## Test
After config, just run to make a test:
~~~
npm test
~~~
## Usage
~~~javascript
const GoogleLang = require('./worker/googleLanguage')

const config = {
  keyFilename: '/path/to/service-account-key-file' // Optional
}

const lang = new GoogleLang(config) // Config is optional, if you have exported your key file into environment, this can be omitted

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
