const T = require('./index.js')
const config = require('./config.json')

const t = new T(config)

t.query({text: 'Oh my god!'}).then(console.log, console.log)
