# baiduOcr
Method to call baidu Voice API.
## Installation
~~~shell
cd worker/baiduVoice && npm install
~~~
## Test
First, edit config.json, config with correct info, then run:
~~~
npm test
~~~
## Usage
~~~javascript
const voice = require('./worker/baiduVoice')

const text = '您好' // String, the text to generate voice

let result = null
try {
  result = await voice(text, opts) // opt is extra options to call AI, [doc](http://ai.baidu.com/docs#/TTS-Online-Node-SDK/top)
} catch (err) {
  console.log(err)
}

require('fs').writeFileSync('./voice.mp3', result.data)
~~~
