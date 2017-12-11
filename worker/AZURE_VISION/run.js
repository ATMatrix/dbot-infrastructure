const monitor = require("../worker_factory")
const config = require('../config.json').azureVision

let azureVision = new monitor("AZURE_VISION", config)
azureVision.run();
