const { DatePicker  } = require('./src/scripts/dt_picker')
const { MoviePicker } = require('./src/scripts/mv_picker')
const { Pensamentos } = require('./src/scripts/pts_manager')
const { Graus       } = require('./src/scripts/Graus')

const route = {
    '/pensamentos': new Pensamentos(),
    '/filme':       new MoviePicker(),
    '/date':        new DatePicker(),
    '/graus':       new Graus(),
}

function routes(inputs, id) {

    let input = inputs.split(' ')
    let command = input[0]
    
    if (route[command])
        return route[command].run(input, id)
}

exports.routes = routes