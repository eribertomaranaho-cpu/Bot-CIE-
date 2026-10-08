require('dotenv').config();
const { REST, Routes, SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

const commands = [
  new SlashCommandBuilder().setName('configurar-cie').setDescription('Cria/organiza a estrutura do servidor CIE.'),
  new SlashCommandBuilder().setName('entrada').setDescription('Registra a entrada de um agente.').addUserOption(o=>o.setName('agente').setDescription('Agente').setRequired(true)),
  new SlashCommandBuilder().setName('saida').setDescription('Registra a saída de um agente.').addStringOption(o=>o.setName('motivo').setDescription('Motivo').setRequired(true)),
  new SlashCommandBuilder().setName('verificar').setDescription('Registra a verificação de um membro.').addUserOption(o=>o.setName('membro').setDescription('Membro').setRequired(true)),
  new SlashCommandBuilder().setName('bate-ponto').setDescription('Inicia ou encerra seu ponto de patrulhamento.'),
  new SlashCommandBuilder().setName('solicitar-patrulhamento').setDescription('Solicita patrulhamento/apoio.').addStringOption(o=>o.setName('local').setDescription('Local').setRequired(true)).addStringOption(o=>o.setName('motivo').setDescription('Motivo').setRequired(true)),
  new SlashCommandBuilder().setName('relatorio-patrulhamento').setDescription('Envia relatório de patrulhamento.').addStringOption(o=>o.setName('relatorio').setDescription('Relato').setRequired(true)),
  new SlashCommandBuilder().setName('treinamento').setDescription('Registra um treinamento.').addStringOption(o=>o.setName('tema').setDescription('Tema').setRequired(true)).addStringOption(o=>o.setName('resultado').setDescription('Resultado').setRequired(true)),
  new SlashCommandBuilder().setName('operacao').setDescription('Registra uma operação.').addStringOption(o=>o.setName('nome').setDescription('Nome da operação').setRequired(true)).addStringOption(o=>o.setName('objetivo').setDescription('Objetivo').setRequired(true)),
  new SlashCommandBuilder().setName('promocao').setDescription('Registra solicitação de promoção.').addUserOption(o=>o.setName('membro').setDescription('Membro').setRequired(true)).addStringOption(o=>o.setName('motivo').setDescription('Motivo').setRequired(true)),
  new SlashCommandBuilder().setName('advertencia').setDescription('Registra advertência.').addUserOption(o=>o.setName('membro').setDescription('Membro').setRequired(true)).addStringOption(o=>o.setName('motivo').setDescription('Motivo').setRequired(true)),
  new SlashCommandBuilder().setName('rebaixamento').setDescription('Registra rebaixamento.').addUserOption(o=>o.setName('membro').setDescription('Membro').setRequired(true)).addStringOption(o=>o.setName('motivo').setDescription('Motivo').setRequired(true)),
  new SlashCommandBuilder().setName('demissao').setDescription('Registra demissão.').addUserOption(o=>o.setName('membro').setDescription('Membro').setRequired(true)).addStringOption(o=>o.setName('motivo').setDescription('Motivo').setRequired(true)),
  new SlashCommandBuilder().setName('exilio').setDescription('Registra exílio.').addUserOption(o=>o.setName('membro').setDescription('Membro').setRequired(true)).addStringOption(o=>o.setName('motivo').setDescription('Motivo').setRequired(true)),
  new SlashCommandBuilder().setName('medalha').setDescription('Registra concessão de medalha/honraria.').addUserOption(o=>o.setName('membro').setDescription('Membro').setRequired(true)).addStringOption(o=>o.setName('medalha').setDescription('Medalha').setRequired(true)).addStringOption(o=>o.setName('motivo').setDescription('Motivo').setRequired(true)),
  new SlashCommandBuilder().setName('aval').setDescription('Solicita avaliação.').addStringOption(o=>o.setName('tipo').setDescription('Tipo de avaliação').setRequired(true)).addStringOption(o=>o.setName('descricao').setDescription('Descrição').setRequired(true)),
  new SlashCommandBuilder().setName('exame-admissao').setDescription('Registra resultado do exame de admissão.').addUserOption(o=>o.setName('candidato').setDescription('Candidato').setRequired(true)).addStringOption(o=>o.setName('resultado').setDescription('Aprovado/Reprovado').setRequired(true)).addStringOption(o=>o.setName('observacao').setDescription('Observação').setRequired(false)),
  new SlashCommandBuilder().setName('relatorio-saida').setDescription('Registra relatório de saída.').addStringOption(o=>o.setName('destino').setDescription('Destino').setRequired(true)).addStringOption(o=>o.setName('motivo').setDescription('Motivo').setRequired(true))
].map(c => c.setDMPermission(false).toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
(async()=>{
  await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands });
  console.log('Comandos registrados.');
})().catch(console.error);
