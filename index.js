const { Client, LocalAuth } = require('whatsapp-web.js')
const { routes } = require('./routes.js')

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

client.on('ready', async () => {
    console.log('Client is ready!')

    const chat = await client.getChatById('553891446498-1487381077@g.us')
    
    cron.schedule('* * * * *', async () => {
        const res = routes('/cronograma get', chat.id._serialized)

        if (res !== undefined) {
            try {
                await chat.sendMessage(res)
            }
            catch(e) {console.log('não tem mensagem', e)}
        }

    })
})

client.on('message_create', async message => {

    console.log(`${message._data.notifyName} (${message._data.id.remote}): ${message._data.body}`)

    try {
        if (message.body[0] === '/') {

            console.log(`--------------------------------------------------\nComando: ${message.body}\n\n`)

            let res
            let inputs = `${message.body}`
            let id = message._data.id.remote

            res = await routes(inputs, id)
            if (res) {
                message.reply(res)
                console.log(res)
                message.delete(false)
            }
            
        }
    } catch (e) {
        console.log('deu erro: \n\n', e)
    }
})

client.initialize()
