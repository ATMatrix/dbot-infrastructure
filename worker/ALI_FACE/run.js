const monitor = require("../worker_factory")
const config = require('../config.json').aliface

let aliface = new monitor("aliFace", config)
aliface.run();
