const monitor = require("../worker_factory")
const config = require('./config.json')

let xiaoi = new monitor("xiaoi", config)
xiaoi.run();
