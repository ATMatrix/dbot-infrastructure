# Registry 实现AI的增删改查功能
根据https://github.com/cryptape/ethereum-bootstrap 搭建好私链<br/>
run.js：测试运行compile_deploy.js的编译部署功能、register.js的增删改查功能<br/>
build/RegisterContractAddress.txt: 将部署好的合约地址写入该文件，之后读取该地址即可<br/>
凡是更改链上状态的方法，都需要通过挖矿(miner.start(1))来使其生效。
