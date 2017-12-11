const monitor = require("../worker_factory")
const config = require('../config.json').googleLanguage

let googleLanguage = new monitor("GOOGLE_LANGUAGE", config)
googleLanguage.run();
