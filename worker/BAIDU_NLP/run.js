const monitor = require("../worker_factory")
const config = require('../config.json').baiduNlp

let baiduNlp = new monitor("BAIDU_OCR", config)
baiduNlp.run();
