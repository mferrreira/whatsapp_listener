const { Client, LocalAuth } = require('whatsapp-web.js')
const { routes, cronograma } = require('./routes.js')

const qrcode = require('qrcode-terminal')
const cron = require('node-cron')

const client = new Client({
    puppeteer: {
        args: ['--no-sandbox']
    },
    authStrategy: new LocalAuth({})
})

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true })
    console.log('QR CODE RECEIVED!', qsr)
})

client.on('authenticated', session => {
    console.log(session)
})

client.on('ready', async () => {
    console.log('Client is ready!')

    const chat = await client.getChatById('553891446498-1487381077@g.us')
    let ultimaMensagem = chat.lastMessage

    // todos os horários do cron como "*" indica que a função será checada a cada minuto
    cron.schedule('* * * * *', async () => {

        const res = cronograma()

        if (res) {
            try {await ultimaMensagem.delete(false)}
            catch {console.log('não tem mensagem')}
        }
        const mensagemEnviada = await chat.sendMessage(res)
        ultimaMensagem = mensagemEnviada
        
    })
})




client.on('message_create', async message => {

    try {
        if (message.body[0] === '/') {

            console.log(`--------------------------------------------------\nComando: ${message.body}\n\n`)

            let res
            let inputs = `${message.body}`
            let id = message._data.id.remote
            let messageId = message.id.id

            res = await routes(inputs, id)

            if (res)
                await message.reply(res)
                message.delete(false)
        }
    } catch (e) {
        console.log('deu erro: \n\n', e)
    }
})

client.initialize()
