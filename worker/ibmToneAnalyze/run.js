const monitor = require("../worker_factory")
const config = require('../config.json').ibmToneAnalyze

let ibmToneAnalyze = new monitor("ibmToneAnalyze", config)
ibmToneAnalyze.run();
