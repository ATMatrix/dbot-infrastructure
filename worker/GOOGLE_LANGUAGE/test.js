const L = require('./index.js')
const config = require('./config.json')
// const config = require('../config.json').googleLanguage
// console.log(config)

const l = new L(config)

l.query({ text: 'Oh my god!' }).then(console.log, console.log)
