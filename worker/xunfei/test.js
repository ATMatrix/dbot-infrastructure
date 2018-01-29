const X = require('./index.js')
const config = require('./config.json')

const x = new X(config)

x.query({ question: '你好' }).then(console.log, console.log)
