const FILE_NAME = './src/data/cronograma.json'
const {load} = require('./fs_crud')
const moment = require('moment')

class Cronograma {
    allowed_ids = {
        '553891446498-1487381077@g.us': 'meu_grupo'
    }

    constructor() {
        this.cronograma = load(FILE_NAME)
    }

    getAtividade() {
        const diaAtual = moment().format('dddd')
        const horarioAtual = moment().format('HH:mm')

        if(this.cronograma.hasOwnProperty(diaAtual)) {
            const atividadesDoDia = this.cronograma[diaAtual]
            for (const atividade of atividadesDoDia)
                if(horarioAtual >= atividade.horarioInicial && horarioAtual <= atividade.horarioFinal && atividade.enviada == false ){
                    atividade.enviada = true
                    return atividade.atividade
                }
        }
        return undefined
    }

    run() {
        const atividadeAtual = this.getAtividade()
        if(atividadeAtual) return atividadeAtual
        return undefined
    }
}

exports.Cronograma = Cronograma