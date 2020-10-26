const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const Stage = require('telegraf/stage')

const Scene = require('telegraf/scenes/base')
const { enter, leave } = Stage

const confirmacao = Extra.markup(Markup.inlineKeyboard([
    Markup.callbackButton('Sim', 's'),
    Markup.callbackButton('Não', 'n'),
]))

const seguinte = Extra.markup(Markup.inlineKeyboard([
    Markup.callbackButton('🚫', 'cancelar'),
    Markup.callbackButton('➡', 'seguinte'),
]))

const menu = Extra.markup(Markup.inlineKeyboard([
    Markup.callbackButton('mostrar defesas', 'mostrarDefesa'),
    Markup.callbackButton('criar nova defesa', 'novaDefesa'),
    Markup.callbackButton('Testar Defesa', 'testarDefesa'),
    Markup.callbackButton('status da Módulo', 'status'),
    Markup.callbackButton('voltar', 'login')
],{columns: 2}))

const btt = [
    Markup.callbackButton('Negação de Serviço', 'denyofservice'),
    Markup.callbackButton('Intrusão', 'intrusao'),
    Markup.callbackButton('Trojan', 'trojan')
]

btt.push(Markup.callbackButton('teste', 'teste'))

const botoesDefesas = Extra.markup(Markup.inlineKeyboard(
   btt,{columns: 2}))


const teclado = Markup.keyboard([
    ['echo', 'greeter', '😐 Neutro'],
    ['😱 Medo', '😔 Pensativo', '☹ Carrancuda'],
    ['😘 Beijo', '😧 Angustiado', '😸 Gato']
]).resize().extra()

const tecladoConfirmacaoBloqueio = Markup.keyboard([
    ['próximo do atacante', 'próximo da vítima'],
    ['próximo de ambos', 'sem bloqueio']
]).resize().extra()

const voltar = Extra.markup(Markup.inlineKeyboard([
    Markup.callbackButton('Voltar', 'menu')
]))

module.exports = {
    confirmacao,
    menu,
    teclado,
    voltar,
    tecladoConfirmacaoBloqueio,
    botoesDefesas,
    seguinte
}