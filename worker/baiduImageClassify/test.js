const d = require('./index.js')

d({method: 'animalDetect', url: 'http://img04.tooopen.com/images/20131223/sy_53022345657.jpg'}).then(console.log, console.log)
