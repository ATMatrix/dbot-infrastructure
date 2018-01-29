const monitor = require("../worker_factory")
const config = require('../config.json').azureVision

let azureVision = new monitor("azureVision", config)
azureVision.run();
