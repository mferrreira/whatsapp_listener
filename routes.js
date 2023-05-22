const { DatePicker  } = require('./src/scripts/dt_picker')
const { MoviePicker } = require('./src/scripts/mv_picker')
const { Pensamentos } = require('./src/scripts/pts_manager')
const { Graus       } = require('./src/scripts/Graus')
const { Cronograma  } = require('./src/scripts/Cronograma')

const crono = new Cronograma

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

function cronograma() {

    const atividadeAtual = crono.getAtividade()

    if(atividadeAtual) {
        return atividadeAtual
    }
}
exports.routes = routes
exports.cronograma = cronograma