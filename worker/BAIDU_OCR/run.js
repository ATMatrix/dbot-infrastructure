const monitor = require("../worker_factory")
const config = require('../config.json').baiduOcr

let baiduOcr = new monitor("baiduOcr", config)
baiduOcr.run();
