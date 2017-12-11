const monitor = require("../worker_factory")
const config = require('../config.json').baiduOcr

let baiduOcr = new monitor("BAIDU_OCR", config)
baiduOcr.run();
