const monitor = require("../worker_factory")
const config = require('../config.json').baiduNlp

let baiduNlp = new monitor("baiduNlp", config)
baiduNlp.run();