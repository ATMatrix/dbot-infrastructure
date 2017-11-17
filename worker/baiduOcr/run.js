const monitor = require("../worker_factory")
const config = require('./config.json')

let baiduOcr = new monitor("baiduOcr", config)
baiduOcr.run();