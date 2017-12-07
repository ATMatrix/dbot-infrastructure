const L = require('./index.js')
const config = require('./config.json')

const l = new L(config)

l.query({ text: 'Oh my god!' }).then(console.log, console.log)
