const FILE_NAME = './src/data/pensamentos.json'
const { save, load } = require('./fs_crud')

/*
    PENSAMENTOS: /pensamentos

    Chame /pensamentos [get] para retornar a lista de pensamentos atual
    Chame /pensamentos [flush] para retornar a lista de pensamentos atual e restaurá-la
    Chame /pensamentos [add] [frase] para adicionar um pensamento à lista 

*/

class Pensamentos {

    allowed_ids = {

    }

    constructor() {

        this.pensamentos = load(FILE_NAME)

        this.routes = {
            'get': this.get.bind(this),
            'flush': this.flush.bind(this),
            'add': this.add.bind(this),
            'help': this.help.bind(this)
        }
    }

    help() {
        texto = `    
            PENSAMENTOS: /pensamentos

            Chame /pensamentos [get] para retornar a lista de pensamentos atual
            Chame /pensamentos [flush] para retornar a lista de pensamentos atual e restaurá-la
            Chame /pensamentos [add] [frase] para adicionar um pensamento à lista 
        `
        return texto
    }

    add(inputs) {

        const pensamento = [...inputs].slice(2, inputs.length).join(' ')

        const data = new Date()
        const format_data = `[${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}][${data.getHours()}:${data.getMinutes()}]`
        const text = format_data + '\t' + pensamento

        this.pensamentos.push(text)
        
        save(this.pensamentos, FILE_NAME)

        return `pensamento adicionado!`
    }

    get() {
        this.pensamentos = load(FILE_NAME)
        let texto_pensamentos = 'Meus pensamentos: \n\n'
        for (let psmt of this.pensamentos) 
            texto_pensamentos += `${psmt}\n\n`
        
        return texto_pensamentos
    }

    flush() {
        let pensamentos = this.get()
        this.pensamentos = []
        save(this.pensamentos, FILE_NAME)
        return pensamentos + `\nLista de pensamentos resetada!!` 
    }

    run(inputs, id) {
        if (!(id in this.allowed_ids)) return '🤨'

        const command = inputs[1]

        if (this.routes[command])
            return this.routes[command](inputs)

        return '...'
    }
}

exports.Pensamentos = Pensamentos

