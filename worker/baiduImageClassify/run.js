const monitor = require("../worker_factory")

let baiduImageClassify = new monitor("baiduImageClassify")
baiduImageClassify.run();