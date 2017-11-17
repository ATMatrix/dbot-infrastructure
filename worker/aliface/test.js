const F = require('./index.js')
const config = require('./config.json')

const f = new F(config)

f.query({ url: 'http://b.hiphotos.baidu.com/image/pic/item/902397dda144ad34d0716944d9a20cf430ad8523.jpg' }).then(console.log, console.log)
