const R = require('./index.js')
const config = require('./config.json')

const r = new R(config)

r.query({ url: 'http://pngimg.com/uploads/brad_pitt/brad_pitt_PNG28.png' }).then(console.log, console.log)
