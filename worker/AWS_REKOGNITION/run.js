const monitor = require("../worker_factory")
const config = require('../config.json').awsRekognition

let awsRekognition = new monitor("AWS_REKOGNITION", config)
awsRekognition.run();
