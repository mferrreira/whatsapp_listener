const axios = require('axios')

/*
  314 GRAUS: /graus

      ----------------------------------------------------------------------------------

              Chame /graus [add] para adicionar um novo evento ao site, ex.:

              /graus add
              name: 
              description: 
              date: 
              image:
              url:

      -----------------------------------------------------------------------------------
              image deve ser a url da imagem que ficará de fundo da caixinha 
              para comprar os ingressos;

              url deve ser o link para compra do ingresso;
      -----------------------------------------------------------------------------------

*/


class Graus {

  allowed_ids = {
    '553891446498-1487381077@g.us': 'meu_grupo',
  }

  constructor() {
    console.log('instância da 314 graus criada!')

    this.routes = {
      'add': this.addEventos.bind(this),
      'help': this.help.bind(this)
    }
  }

  help() {
    return `
        314 GRAUS: /graus

        ----------------------------------------------------------------------------------

        Chame /graus [add] para adicionar um novo evento ao site, ex.:

        /graus add
        name: 
        description: 
        date: 
        image:
        url:

        -----------------------------------------------------------------------------------
        image deve ser a url da imagem que ficará de fundo da caixinha 
        para comprar os ingressos;

        url deve ser o link para compra do ingresso;
        -----------------------------------------------------------------------------------
        `
  }

  async addEventos(data) {
    const regex = /(\w+):\s*([^,]+)/g
    const evento = {}

    let match
    while ((match = regex.exec(data.join(' '))) !== null) {
      evento[match[1]] = match[2]
    }

    try {
      const formData = new FormData()

      Object.entries(evento).map(([chave, valor]) => {
        formData.append(chave, valor)
      })

      const headers = { 'Content-Type': 'multipart/form-data' }
      const response = await axios.post(process.env.GRAUS_EVENT_POST, formData, { headers: headers })
      return response.data
    } catch (e) {
      console.log('ocorreu um erro:\n', e)
      return 'ocorreu algum erro...'
    }
  }


  run(input, id) {
    if (!(id in this.allowed_ids)) return 'tu não pode fazer isso... 🤨'
    
    const command = input[1]
    if (this.routes[command])
      return this.routes[command](input)
    
    return 'Não há o que retornar'
  }
}

exports.Graus = Graus