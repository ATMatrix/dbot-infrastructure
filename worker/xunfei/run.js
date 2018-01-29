const monitor = require("../worker_factory")
const config = require('../config.json').xunfei

let xunfei = new monitor("xunfei", config)
xunfei.run();
