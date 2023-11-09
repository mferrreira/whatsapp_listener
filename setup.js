const { exec } = require('child_process')

exec("touch ./src/data/pensamentos.json ./src/data/cronograma.json", (error, stdout, stderr) => {
    if (error) 
        console.log("Ocorreu um erro: ", error.message)
    if (stderr)
        console.log("Ocorreu um erro: ", stderr)
    
    console.log("Arquivos criados com sucesso!")
})