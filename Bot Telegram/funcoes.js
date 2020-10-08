const fetch = require('node-fetch')
const ping = require('ping')
const inlineMenu = require('telegraf-inline-menu')
const env = require('../.env')
const fs = require('fs')
const contentFilePath = './database/phi.json'
const path = './database/'
// const path = './'

const save = (content, fileName) => {
    const contentString = JSON.stringify(content, null, 4)
    return fs.writeFileSync(`${path}${fileName}.json`, contentString)
    // return fs.writeFileSync(contentFilePath, contentString)
}

const load = (fileName) => {
    // const fileBuffer = fs.readFileSync(contentFilePath, 'utf8')
    const fileBuffer = fs.readFileSync(`${path}${fileName}.json`, 'utf8')
    const contentJson = JSON.parse(fileBuffer)
    return contentJson
}



const testeDeAtaque = async (nomeDoAtaque) => {
    const response = await fetch(`http://${env.SERVER_API}:${env.PORT_API}/${nomeDoAtaque}`);
    const myJson = await response.json(); 
    return myJson
}




module.exports = {
    testeDeAtaque,
    save,
    load
}