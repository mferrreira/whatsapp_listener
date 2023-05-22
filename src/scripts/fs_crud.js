const fs = require('fs')

function save(data, file_path) {
    const data_string = JSON.stringify(data)
    return fs.writeFileSync(file_path, data_string)
}

function load(file_path) {
    console.log('carregando arquivo... ', file_path)

    const buffer = fs.readFileSync(file_path, 'utf-8')
    const content = JSON.parse(buffer)
    
    console.log('carregamento concluído')
    return content
}

module.exports = {
    save, 
    load
}