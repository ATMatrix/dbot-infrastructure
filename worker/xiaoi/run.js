const monitor = require("../worker_factory")
const config = require('../config.json').xiaoi

let xiaoi = new monitor("xiaoi", config)
xiaoi.run();
