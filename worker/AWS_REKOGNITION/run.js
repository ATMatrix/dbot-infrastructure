const monitor = require("../worker_factory")
const config = require('../config.json').awsRekognition

let awsRekognition = new monitor("awsRekognition", config)
awsRekognition.run();
