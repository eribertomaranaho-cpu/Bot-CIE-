require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Client, GatewayIntentBits, ChannelType, PermissionsBitField, EmbedBuilder, Events } = require('discord.js');
const { categories, roles, staffRoles } = require('./config');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });
const dataDir = path.join(__dirname, '..', 'data');
const dataFile = path.join(dataDir, 'registros.json');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
if (!fs.existsSync(dataFile)) fs.writeFileSync(dataFile, JSON.stringify({ ponto: {}, registros: [] }, null, 2));
function db(){ return JSON.parse(fs.readFileSync(dataFile,'utf8')); }
function save(x){ fs.writeFileSync(dataFile, JSON.stringify(x,null,2)); }
function now(){ return new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }); }
function embed(title, description, color=0x2f3136){ return new EmbedBuilder().setTitle(title).setDescription(description).setColor(color).setFooter({text:'CIE • Centro de Inteligência do Exército'}).setTimestamp(); }
async function findText(guild,name){ return guild.channels.cache.find(c=>c.type===ChannelType.GuildText && c.name===name); }
async function log(guild, channelName, title, description, color=0x5865F2){ const ch=await findText(guild,channelName); if(ch) await ch.send({embeds:[embed(title,description,color)]}); }
function isStaff(i){
  if(i.memberPermissions?.has(PermissionsBitField.Flags.Administrator) || i.memberPermissions?.has(PermissionsBitField.Flags.ManageGuild) || i.memberPermissions?.has(PermissionsBitField.Flags.ManageChannels)) return true;
  return staffRoles.some(name => i.member?.roles?.cache?.some(r => r.name === name));
}

client.once(Events.ClientReady, c => console.log(`Bot online: ${c.user.tag}`));

client.on(Events.InteractionCreate, async i => {
  if(!i.isChatInputCommand()) return;
  try {
    const d = db();
    if(i.commandName==='configurar-cie'){
      if(!isStaff(i)) return i.reply({content:'❌ Você precisa de Gerenciar Servidor/Canais.', ephemeral:true});
      let created=0;
      let rolesCreated=0;

      // Cria/verifica os cargos na ordem definida no config.
      // O bot não concede permissões administrativas automaticamente.
      for(const roleName of roles){
        let role=i.guild.roles.cache.find(r=>r.name===roleName);
        if(!role){
          await i.guild.roles.create({name:roleName, reason:'Configuração automática do CIE'});
          rolesCreated++;
        }
      }

      for(const cat of categories){
        let category=i.guild.channels.cache.find(c=>c.type===ChannelType.GuildCategory && c.name===cat.name);
        if(!category){ category=await i.guild.channels.create({name:cat.name,type:ChannelType.GuildCategory}); created++; }
        for(const [type,name] of cat.channels){
          const exists=i.guild.channels.cache.find(c=>c.parentId===category.id && c.name===name.toLowerCase());
          if(!exists){ await i.guild.channels.create({name, type:type==='voice'?ChannelType.GuildVoice:ChannelType.GuildText, parent:category.id}); created++; }
        }
      }
      return i.reply({embeds:[embed('🏛️ Estrutura CIE configurada',`Foram criados/verificados **${created}** canais/categorias e **${rolesCreated}** cargos.\n\nCargos configurados: **${roles.length}**\n\nA estrutura foi baseada nas imagens enviadas, incluindo Recepção, Informações, Patrulhamento, Treinamento, Simulações, Operações, Medalhas, Relatórios, Documentação e Alto Comando.`,0x2ecc71)]});
    }
    if(i.commandName==='bate-ponto'){
      const id=i.user.id; const current=d.ponto[id];
      if(!current){ d.ponto[id]={inicio:Date.now(), inicioFmt:now()}; save(d); await log(i.guild,'patrulhamentos','🟢 Ponto iniciado',`**Agente:** ${i.user}\n**Início:** ${d.ponto[id].inicioFmt}`,0x2ecc71); return i.reply({content:'🟢 Ponto iniciado. Bom patrulhamento!',ephemeral:true}); }
      const mins=Math.floor((Date.now()-current.inicio)/60000); delete d.ponto[id]; save(d); await log(i.guild,'patrulhamentos','🔴 Ponto encerrado',`**Agente:** ${i.user}\n**Início:** ${current.inicioFmt}\n**Duração:** ${mins} min`,0xe74c3c); return i.reply({content:`🔴 Ponto encerrado. Duração: **${mins} minutos**.`,ephemeral:true});
    }
    const map={
      entrada:['entrada-e-saida','🛬 Entrada registrada',0x2ecc71], saida:['relatorio-de-saida','👋 Saída registrada',0xe67e22], verificar:['verificacao','✅ Verificação registrada',0x3498db],
      'relatorio-patrulhamento':['patrulhamentos','🚓 Relatório de patrulhamento',0x3498db], treinamento:['relatorio-de-treinamento','🎓 Treinamento registrado',0x9b59b6], operacao:['operações','🚩 Operação registrada',0xe74c3c],
      promocao:['promoções','📗 Promoção registrada',0x2ecc71], advertencia:['advertências','📒 Advertência registrada',0xf1c40f], rebaixamento:['rebaixamentos','📙 Rebaixamento registrado',0xe67e22], demissao:['demissão','📕 Demissão registrada',0xe74c3c], exilio:['exílios','📕 Exílio registrado',0x8e44ad], medalha:['medalhas','🏅 Medalha registrada',0xf1c40f], aval:['solicitar-aval','⌛ Avaliação solicitada',0x3498db], 'exame-admissao':['exame-de-admissão','🏆 Exame de admissão',0x2ecc71], 'relatorio-saida':['relatorio-de-saida','📝 Relatório de saída',0xe67e22]
    };
    if(map[i.commandName]){
      const [channel,title,color]=map[i.commandName];
      if(['promocao','advertencia','rebaixamento','demissao','exilio','medalha'].includes(i.commandName) && !isStaff(i)) return i.reply({content:'❌ Este registro é restrito ao comando.',ephemeral:true});
      const fields=[]; for(const opt of i.options.data){ if(opt.value!==undefined) fields.push(`**${opt.name}:** ${opt.user ? opt.user : opt.value}`); }
      const desc=`**Responsável:** ${i.user}\n${fields.join('\n')}`;
      d.registros.push({tipo:i.commandName, autor:i.user.id, data:now(), dados:fields}); save(d);
      await log(i.guild,channel,title,desc,color);
      return i.reply({content:`✅ ${title} enviado para **#${channel}**.`,ephemeral:true});
    }
    if(i.commandName==='solicitar-patrulhamento'){
      await log(i.guild,'solicitar-patrulhamento-e-apoio','🚨 Solicitação de patrulhamento/apoio',`**Solicitante:** ${i.user}\n**Local:** ${i.options.getString('local')}\n**Motivo:** ${i.options.getString('motivo')}`,0xe74c3c);
      return i.reply({content:'🚨 Solicitação enviada ao canal de patrulhamento.',ephemeral:true});
    }
  } catch(e){ console.error(e); if(!i.replied) await i.reply({content:'❌ Ocorreu um erro ao executar o comando.',ephemeral:true}); }
});
client.login(process.env.DISCORD_TOKEN);
