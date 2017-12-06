const A = require('./index.js')
const config = require('./config.json')

const a = new A(config)

a.query({ url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyfICYqipacWJlAPf9TszyZu6JcGnojKXqqlGm-Jp8JR-TdpqaCg' }).then(console.log, console.log)
