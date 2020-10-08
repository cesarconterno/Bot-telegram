const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const { enter, leave } = Stage
const fetch = require('node-fetch');
const ping = require('ping')
const botoes = require('./botoes')
const fn = require('./funcoes')
const env = require('../.env')


// menu
const menuCena = new Scene('menu')
menuCena.enter((ctx) => ctx.replyWithMarkdown(`*MENU*\n\n\n\n\nEscolha um botão`, botoes.menu))

menuCena.action('novaDefesa', (ctx) => ctx.scene.enter('novaDefesa'))

menuCena.action('testarDefesa', (ctx) => ctx.scene.enter('testarDefesa'))

menuCena.action('mostrarDefesa', (ctx) => ctx.scene.enter('mostrarDefesa'))

menuCena.action('login', (ctx) => ctx.scene.enter('login'))

menuCena.action('status',async ctx => {
    const hostAPI = env.SERVER_API
    ping.sys.probe(hostAPI, function(isAlive){
        var msg = isAlive ? 'online' : 'offline';
        console.log(msg); 
        ctx.answerCbQuery(msg);
        // ctx.replyWithQuiz('qual?')
    })
})








module.exports = {
    menuCena
}