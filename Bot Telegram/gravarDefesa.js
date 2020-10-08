
// const Stage = require('telegraf/stage')
// const WizardScene = require("telegraf/scenes/wizard");
// const Scene = require('telegraf/scenes/base')
// const { enter, leave } = Stage
// const botoes = require('./botoes')
// const Composer = require('telegraf/composer')
// const env = require('../.env')
// const fn = require('./funcoes')


// // const perguntaBloqueio = new Composer()
// // const confirmacaoHandler = new Composer()

// const defesa = {
//         nome_ataque: '',
//         tipo_bloqueio: '',
// 		texto_email: ''
// }

// const gravarDefesaCena = new WizardScene('gravarDefesa',
//     ctx => {
//         ctx.replyWithHTML(`	A seguir, será pedido uma série de parâmetros para a gravação do mecanismo de Defesa.
        
//         Insira o <b>nome do ataque</b>:`)
//         ctx.wizard.next()
//     },
//     ctx => {
//         defesa.nome_ataque = ctx.update.message.text
//         // const usuario = ctx.update.message.from.first_name
//         // ctx.reply(`Ok... ${usuario}`)
//         ctx.replyWithHTML(`Insira o <b>tipo de bloqueio</b>:`, botoes.tecladoConfirmacaoBloqueio)
//         ctx.wizard.next()
//     },
//     ctx => {
//         defesa.tipo_bloqueio = ctx.update.message.text
//         ctx.replyWithHTML(`Insira o <b>texto do email</b>:`)
//         ctx.wizard.next()
//     },
//     //usuario_vitima
//     ctx => {
//         defesa.texto_email = ctx.update.message.text
//         // ctx.reply('Nome da vítima')
//         // ctx.replyWithHTML(`Insira o <b>nome da vítima</b>:`)
//         // ctx.wizard.next()
//     },
//     async ctx => {
//         ataque.email_vitima = ctx.update.message.text
//         // const argumentosDoTeste = `${ataque.nome}?ip_vitima=${ataque.ip_vitima}&ip_atacante=${ataque.ip_atacante}&usuario_vitima=${ataque.usuario_vitima}&email_vitima=${ataque.email_vitima}`
//         const argumentosTrojan =`${ataque.nome}?ip_vitima=${ataque.ip_vitima}&usuario_vitima=${ataque.usuario_vitima}&email_vitima=${ataque.email_vitima}`
//         // const aux = await fn.testeDeAtaque(argumentosTrojan)
//         // console.log(aux)
//         // await ctx.reply(`${JSON.stringify(aux, null, 4)}`)
//         await ctx.reply(argumentosTrojan)
//         ctx.scene.enter('menu')
//     }
// )



// module.exports = {
//     gravarDefesaCena
// }