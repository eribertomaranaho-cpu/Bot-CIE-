# CIE Discord Bot

Bot do **CIE — Centro de Inteligência do Exército**, configurado para montar a estrutura do servidor e trabalhar com os cargos definidos pelo comando.

## Cargos configurados
1. CRIADORES
2. DONOS
3. SUPERVISOR GERAL
4. SUPERVISOR
5. [CIE] COMANDANTE
6. [CIE] SUB COMANDANTE
7. [CIE] SUPERVISOR
8. [CIE] AGENTE CLASSE ALTA
9. [CIE] AGENTES TECNICO
10. [CIE] AGENTES
11. [CIE] MEMBROS
12. [CIE] ESTAGIARIO
13. [CIE] VISITANTE

Os cargos são criados automaticamente pelo comando `/configurar-cie` caso ainda não existam.

### Cargos com acesso administrativo do bot
- CRIADORES
- DONOS
- SUPERVISOR GERAL
- SUPERVISOR
- [CIE] COMANDANTE
- [CIE] SUB COMANDANTE
- [CIE] SUPERVISOR

> O bot não dá permissões perigosas aos cargos automaticamente. As permissões dos cargos podem ser ajustadas no Discord.

## Instalação
1. Instale Node.js 20 ou superior.
2. Execute `npm install`.
3. Copie `.env.example` para `.env`.
4. Coloque o token do bot em `DISCORD_TOKEN`.
5. Execute `node src/deploy-commands.js` uma vez.
6. Execute `node src/index.js`.
7. No servidor, use `/configurar-cie`.

O bot precisa de permissões suficientes para criar cargos, categorias e canais. Para organizar a hierarquia corretamente, deixe o cargo do bot acima dos cargos que ele precisa criar/gerenciar.
