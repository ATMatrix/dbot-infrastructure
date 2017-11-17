const monitor = require("../worker_factory")
const config = require('./config.json')

let aliface = new monitor("aliface", config)
aliface.run();