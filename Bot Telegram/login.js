const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const { enter, leave } = Stage
const fn = require('./funcoes')
const btn = require('./botoes')

// login
const loginCena = new Scene('login')
loginCena.enter((ctx) => {
    ctx.reply('Comandos ativados: /sobre e /ajuda')
    ctx.replyWithMarkdown(`*LOGIN*\n\n\n\n\nDigite a senha de acesso`)
})

loginCena.hears('pizza', async (ctx) => {
    await ctx.reply('Login efetuado com sucesso')
    ctx.scene.enter('menu')
})

loginCena.command('sobre', ctx => {
    ctx.reply(`Esse bot foi desenvolvido como uma interface do usúario com o módulo de Defesa e proteção`, btn.seguinte)
})
loginCena.action('seguinte', async (ctx) => {
    await ctx.reply('A navegação pelo bot se dá preferencialmente pelo botões exibidos no chat, após a autenticação no login')
    ctx.scene.enter('login')
})

loginCena.action('cancelar', (ctx) => ctx.scene.enter('login'))

module.exports = {
    loginCena
}