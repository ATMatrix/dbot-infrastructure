const monitor = require("../worker_factory")
const config = require('../config.json').baiduNlp

let baiduNlp = new monitor("BAIDU_NLP", config)
baiduNlp.run();
