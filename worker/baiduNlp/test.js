const Nlp = require('./index.js')
const config = require('./config.json')

const nlp = new Nlp(config)

nlp.query({text: '气死我了！'}).then(console.log, console.log)
