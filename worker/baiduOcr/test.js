const D = require('./index.js')
const config = require('./config.json')

const d = new D(config)
d.query({method: 'idcard', url: 'http://imgsrc.baidu.com/imgad/pic/item/bd3eb13533fa828bbd0022d9f61f4134970a5aec.jpg'}).then(console.log, console.log)
