const Q = require('./index.js')
const config = require('./config.json')

const q = new Q(config)

q.query({ question: '你是谁？' }).then(console.log, console.log)
