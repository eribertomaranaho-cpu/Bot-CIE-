module.exports = {
  serverName: 'CIE',

  // Cargos criados/verificados automaticamente pelo /configurar-cie.
  // A ordem é da maior para a menor prioridade no Discord.
  roles: [
    'CRIADORES',
    'DONOS',
    'SUPERVISOR GERAL',
    'SUPERVISOR',
    '[CIE] COMANDANTE',
    '[CIE] SUB COMANDANTE',
    '[CIE] SUPERVISOR',
    '[CIE] AGENTE CLASSE ALTA',
    '[CIE] AGENTES TECNICO',
    '[CIE] AGENTES',
    '[CIE] MEMBROS',
    '[CIE] ESTAGIARIO',
    '[CIE] VISITANTE'
  ],

  // Quem tiver um destes cargos poderá usar funções administrativas do bot.
  staffRoles: [
    'CRIADORES',
    'DONOS',
    'SUPERVISOR GERAL',
    'SUPERVISOR',
    '[CIE] COMANDANTE',
    '[CIE] SUB COMANDANTE',
    '[CIE] SUPERVISOR'
  ],

  categories: [
    { name: 'CIE || Recepção', channels: [
      ['text', 'entrada-e-saida'], ['text', 'relatorio-de-saida'], ['text', 'verificacao']
    ]},
    { name: 'CIE || Informações', channels: [
      ['text', 'constituicao'], ['text', 'anuncios'], ['text', 'hierarquia'], ['text', 'enquetes'], ['text', 'album']
    ]},
    { name: 'CIE || Interação Pública', channels: [
      ['text', 'chat-geral'], ['text', 'midias']
    ]},
    { name: 'Área Estagiários', channels: [['text', 'formatura']] },
    { name: 'Área Estagiários • "Call"', channels: [['voice', 'Formaturas']] },
    { name: 'CIE || Calls', channels: [
      ['voice', 'Reuniões'], ['voice', 'Call Geral'], ['voice', 'AFK dormindo']
    ]},
    { name: 'CIE || Interação Agentes', channels: [
      ['text', 'midias-cie'], ['text', 'comandos-bot'], ['text', 'pérolas']
    ]},
    { name: 'CIE || Patrulhamento', channels: [
      ['text', 'bate-ponto'], ['text', 'solicitar-patrulhamento-e-apoio'], ['text', 'patrulhamentos']
    ]},
    { name: 'CIE || Treinamento', channels: [
      ['text', 'anuncios-treinamentos'], ['text', 'relatorio-de-treinamento'], ['voice', 'Treinamentos']
    ]},
    { name: 'CIE || Simulações', channels: [
      ['text', 'simulações'], ['text', 'simulações-interação']
    ]},
    { name: 'CIE || Operações', channels: [
      ['text', 'operações'], ['voice', 'Operações'], ['voice', 'Operações investigativas']
    ]},
    { name: 'CIE || Medalhas e honrarias', channels: [
      ['text', 'medalhas'], ['text', 'solicitar-medalhas']
    ]},
    { name: 'CIE || Relatórios', channels: [
      ['text', 'exame-de-admissão'], ['text', 'promoções'], ['text', 'advertências'], ['text', 'rebaixamentos'], ['text', 'demissão'], ['text', 'exílios'], ['text', 'solicitar-aval']
    ]},
    { name: 'CIE || Documentação', channels: [
      ['text', 'fardamentos'], ['text', 'patrulhamento'], ['text', 'exame-de-admissão']
    ]},
    { name: 'CIE || Alto Comando', channels: [['voice', 'Reunião']] }
  ]
};
