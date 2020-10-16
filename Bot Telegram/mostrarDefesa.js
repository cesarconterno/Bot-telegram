// const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
// const { enter, leave } = Stage
// const fetch = require('node-fetch');
// const ping = require('ping')
const btn = require('./botoes')
const fn = require('./funcoes')
// const env = require('../.env')
const fs = require('fs')

const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')


const mostrarDefesaCena = new Scene('mostrarDefesa')
mostrarDefesaCena.enter(async (ctx) => {

    const array = fs.readdirSync('./database')

    const btt = []

    array.forEach(element => {
        btt.push(Markup.callbackButton(element,`btn ${element}`))
    });

    const botoesDefesas = Extra.markup(Markup.inlineKeyboard(
        btt,{columns: 2})
    )
    const botaoVoltar = Extra.markup(Markup.inlineKeyboard(
        [
            Markup.callbackButton('voltar', 'menu')
        ],{columns: 1})
    )
    
    await ctx.replyWithMarkdown('Clique em um dos botões', botoesDefesas)
    ctx.reply('Clique em voltar para voltar ao menu principal', btn.voltar)
    
})

mostrarDefesaCena.action('menu', (ctx) => ctx.scene.enter('menu'))


mostrarDefesaCena.action(/btn (\w+)/i, (ctx) => {

    const ataque = ctx.match[1]
    const detalheDaDefesa = fn.load(ataque)

    // const saida = `Nome do Ataque: ${detalheDaDefesa.nome_ataque}
    // Tipo de Bloqueio: ${detalheDaDefesa.tipo_bloqueio}
    // Argumentos: ${detalheDaDefesa.argumentos}`
    // ctx.answerCbQuery(`${JSON.stringify(saida, null, 4)}`, true)

    ctx.answerCbQuery(`${JSON.stringify(detalheDaDefesa, null, 4)}`, true)
})


module.exports = {
    mostrarDefesaCena
}