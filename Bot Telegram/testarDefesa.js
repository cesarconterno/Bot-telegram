
const Stage = require('telegraf/stage')
const WizardScene = require("telegraf/scenes/wizard");
const Scene = require('telegraf/scenes/base')
const { enter, leave } = Stage
const botoes = require('./botoes')
const Composer = require('telegraf/composer')
const fs = require('fs')
const fn = require('./funcoes')


// const perguntaBloqueio = new Composer()
// const confirmacaoHandler = new Composer()

const ataque = {
        nome_ataque: '',
        tipo_bloqueio: '',
        ip_atacante: '',
        ip_vitima: '',
        usuario_vitima: '',
        email_vitima: '' 
}
let argumentosDoTeste = ''

const testarDefesaCena = new WizardScene('testarDefesa',
    ctx => {
        ctx.replyWithHTML(`A seguir, será pedido uma série de parâmetros para a realização do teste.
        
        Não haverá correção dos parâmetros inseridos por parte do Bot do Telegram.
        
        Insira o <b>nome do ataque</b>:`)
        ctx.wizard.next()
    },
    ctx => {
        ataque.nome_ataque = ctx.update.message.text
        const defesa_gravada = fn.load(ataque.nome_ataque)
        ataque.tipo_bloqueio = defesa_gravada.tipo_bloqueio
        ctx.replyWithHTML(`Insira o <b>IP do atacante</b>:`)
        ctx.wizard.next()
    },
    ctx => {
        ataque.ip_atacante = ctx.update.message.text
        ctx.replyWithHTML(`Insira o <b>IP da vítima</b>:`)
        ctx.wizard.next()
    },
    ctx => {
        ataque.ip_vitima = ctx.update.message.text
        ctx.replyWithHTML(`Insira o <b>nome da vítima</b>:`)
        ctx.wizard.next()
    },
    ctx => {
        ataque.usuario_vitima = ctx.update.message.text
        ctx.replyWithHTML(`Insira o <b>email da vítima</b>:`)
        ctx.wizard.next()
    },
    async ctx => {
        ataque.email_vitima = ctx.update.message.text
        
        if(ataque.nome_ataque == 'DOS'){
            argumentosDoTeste = `denyofservice?ip_atacante=${ataque.ip_atacante}&ip_vitima=${ataque.ip_vitima}`
            // http://localhost:4000/denyofservice?ip_atacante=201.17.89.75&ip_vitima=177.103.87.156
        }else if(ataque.nome_ataque == 'intrusao') {
            argumentosDoTeste = `intrusao?ip_vitima=${ataque.ip_vitima}&usuario_vitima=${ataque.usuario_vitima}&email_vitima=${ataque.email_vitima}`
        }else if(ataque.nome_ataque == 'trojan') {
            argumentosDoTeste = `trojan?ip_vitima=${ataque.ip_vitima}&usuario_vitima=${ataque.usuario_vitima}&email_vitima=${ataque.email_vitima}`
        }else if(ataque.nome_ataque == 'worm') {
            argumentosDoTeste = `worm?ip_vitima=${ataque.ip_vitima}&usuario_vitima=${ataque.usuario_vitima}&email_vitima=${ataque.email_vitima}`
        }else {
            argumentosDoTeste = `editavel?tipo_bloqueio=${ataque.tipo_bloqueio}&ip_vitima=${ataque.ip_vitima}&ip_atacante=${ataque.ip_atacante}&usuario_vitima=${ataque.usuario_vitima}&email_vitima=${ataque.email_vitima}&nome_ataque=${ataque.nome_ataque}`
        }
        console.log(ataque.nome_ataque)
        // ctx.reply(argumentosDoTeste)
        const aux = await fn.testeDeAtaque(argumentosDoTeste)
        console.log(aux)
        await ctx.reply(`${JSON.stringify(aux, null, 4)}`)
        ctx.scene.enter('menu')
    }
)



module.exports = {
    testarDefesaCena
}