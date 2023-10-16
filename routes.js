const { Pensamentos } = require('./src/scripts/pts_manager')
const { Cronograma } = require('./src/scripts/Cronograma')

const route = {
    '/pensamentos': new Pensamentos(),
    '/cronograma': new Cronograma(),
}

function routes(inputs, id) {
    
    let input = inputs.split(' ')
    let command = input[0]

    if (route[command])
        return route[command].run(input, id)
}

exports.routes = routes