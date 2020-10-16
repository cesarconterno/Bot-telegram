const fs = require('fs')
const Stage = require('telegraf/stage')
const WizardScene = require("telegraf/scenes/wizard");
const Scene = require('telegraf/scenes/base')
const { enter, leave } = Stage
const botoes = require('./botoes')
const Composer = require('telegraf/composer')
const fn = require('./funcoes')

const perguntaBloqueio = new Composer()
const confirmacaoHandler = new Composer()

const defesa = {
    nome_ataque: '',
    tipo_bloqueio: '',
    argumentos: [
        'ip_vitima',
        'ip_atacante',
        'tipo_bloqueio'
    ]
}


perguntaBloqueio.hears('próximo do atacante', ctx => {
    defesa.tipo_bloqueio = 'próximo do atacante'
    ctx.reply(`Aqui está um resumo da defesa:
    Defesa contra o ataque: ${defesa.nome_ataque}, com bloqueio perto do atacante,  Confirma?`, botoes.confirmacao)
    ctx.wizard.next()
})
perguntaBloqueio.hears('próximo da vítima', ctx => {
    defesa.tipo_bloqueio = 'próximo da vítima'
    ctx.reply(`Aqui está um resumo da defesa:
    Defesa contra o ataque:: ${defesa.nome_ataque}, com bloqueio perto da vítima,  Confirma?`, botoes.confirmacao)
    ctx.wizard.next()
})
perguntaBloqueio.hears('próximo de ambos', ctx => {
    defesa.tipo_bloqueio = 'próximo de ambos'
    ctx.reply(`Aqui está um resumo da defesa:
    Defesa contra o ataque:: ${defesa.nome_ataque}, com bloqueio próximo de ambos,  Confirma?`, botoes.confirmacao)
    ctx.wizard.next()
})
perguntaBloqueio.hears('sem bloqueio', ctx => {
    defesa.tipo_bloqueio = 'sem bloqueio'
    ctx.reply(`Aqui está um resumo da defesa:
    Defesa contra o ataque:: ${defesa.nome_ataque}, sem bloqueio,  Confirma?`, botoes.confirmacao)
    ctx.wizard.next()
})
perguntaBloqueio.use(ctx => ctx.reply('Escolha uma das opções abaixo'))


confirmacaoHandler.action('s', async ctx => {
    await ctx.reply('Defesa confirmada!')
    fn.save(defesa, defesa.nome_ataque)
    await ctx.scene.enter('menu')
})

confirmacaoHandler.action('n', ctx => {
    ctx.reply('Defesa excluída!')
    ctx.scene.enter('menu')
})

confirmacaoHandler.use(ctx => ctx.reply('Apenas confirme', botoes.confirmacao))


const novaDefesaCena = new WizardScene('novaDefesa',
    ctx => {
        ctx.replyWithHTML(`	A seguir, será pedido uma série de parâmetros para a gravação do mecanismo de Defesa.
        
        Insira o <b>nome do ataque</b>:`)
        ctx.wizard.next()
    },
    async ctx => {
        defesa.nome_ataque = ctx.update.message.text

        if(defesa.nome_ataque ==  'worm' || defesa.nome_ataque ==  'denyofservice' || defesa.nome_ataque ==  'intrusao' || defesa.nome_ataque ==  'trojan'){
            await ctx.reply('esse ataque não pode ser criado por ser um ataque nativo do módulo de Defesa/ Proteção')
            ctx.scene.enter('menu')
        }else {
            ctx.reply('Haverá bloqueio no fluxo de dados?', botoes.tecladoConfirmacaoBloqueio)
            ctx.wizard.next()
        }
        
    },
    perguntaBloqueio,
    confirmacaoHandler
)



module.exports = {
    novaDefesaCena
}