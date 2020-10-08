const env = require('./.env')
const Telegraf = require('telegraf')
const session = require('telegraf/session')
const Stage = require('telegraf/stage')

const {loginCena} = require('./Bot Telegram/login.js');
const {menuCena} = require('./Bot Telegram/menu')
const {novaDefesaCena} = require('./Bot Telegram/novaDefesa')
const {testarDefesaCena} = require('./Bot Telegram/testarDefesa');
const { mostrarDefesaCena } = require('./Bot Telegram/mostrarDefesa');

const bot = new Telegraf(env.token)
const stage = new Stage([loginCena, menuCena, novaDefesaCena, testarDefesaCena, mostrarDefesaCena])
bot.use(session())
bot.use(stage.middleware())


bot.start((ctx) => {
    const name = ctx.update.message.from.first_name
    ctx.reply(`Seja bem vindo, ${name}!`)
    // ctx.replyWithAudio({source: `./coin_mario.mp3`})
    ctx.scene.enter('login')
})

bot.startPolling()