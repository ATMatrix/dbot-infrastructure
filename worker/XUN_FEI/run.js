const monitor = require("../worker_factory")
const config = require('../config.json').xunfei

let xunfei = new monitor("XUN_FEI", config)
xunfei.run();
