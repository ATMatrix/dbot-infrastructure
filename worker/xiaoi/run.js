const monitor = require("../worker_factory")
const config = require('../config.json').xiaoi

let xiaoi = new monitor("XIAO_I", config)
xiaoi.run();
