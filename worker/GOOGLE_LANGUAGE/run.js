const monitor = require("../worker_factory")
const config = require('../config.json').googleLanguage

let googleLanguage = new monitor("googleLanguage", config)
googleLanguage.run();
