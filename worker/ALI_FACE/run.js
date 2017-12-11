const monitor = require("../worker_factory")
const config = require('../config.json').aliface

let aliface = new monitor("ALI_FACE", config)
aliface.run();
