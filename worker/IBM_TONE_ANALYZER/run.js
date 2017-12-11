const monitor = require("../worker_factory")
const config = require('../config.json').ibmToneAnalyze

let ibmToneAnalyze = new monitor("IBM_TONE_ANALYZER", config)
ibmToneAnalyze.run();
