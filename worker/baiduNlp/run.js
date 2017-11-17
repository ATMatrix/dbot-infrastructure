const monitor = require("../worker_factory")
const config = require('./config.json')

let baiduNlp = new monitor("baiduNlp", config)
baiduNlp.run();