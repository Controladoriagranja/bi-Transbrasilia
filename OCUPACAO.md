# Ocupação Modal
Página: ocupacao.html, no menu do relatório Transbrasilia existente.

Dados e regras validados em 09/11/2026:
- Frango utiliza transbrasilia.movimentacoes e data Movimento do payload (fallback data_abate). Capacidade 627 x 6,5 aves por registro, meta 100%.
- Ração e Grãos utilizam a base detalhada do arquivo TransBrasilia 2026.xlsx, janeiro a setembro. As capacidades históricas das linhas da base são preservadas; a capacidade repetida já zerada no Excel não é contada novamente.
- Metas: Ração 96%, Grãos 98,50%. Não somar kg e aves em um total geral.
- Regra de exclusão de Ração: primeiro cadastro por placa na aba Parâmetros, como o PROCV. Quinze placas excluídas de ambos os componentes e das opções de placa ao selecionar Ração. GXM5G34 e GXM5H09 possuem duplicidades conflitantes; o primeiro cadastro é Excluir.
- Grãos inclui somente placas classificadas como Grãos. Ausência de capacidade não produz zero artificial.
- Janeiro a junho de Ração continham percentuais digitados; o usuário autorizou recalcular pela base.
- 27 combinações modalidade/mês conferidas contra as somas do Excel; consultas da API também validadas nos agrupamentos diário e semanal.

Importação de referência: PortalBI/BI_Transbrasilia_novo/etl/ocupacao_store.py. Tabelas ocupacao_base e ocupacao_capacidades; view ocupacao_dados. Reimportação do mesmo arquivo substitui somente a referência dele, sem duplicar linhas.

Pendência: o pacote de pesagem recebido exige interação no navegador e uma operação válida por tipo. O formulário wfr200d4 / menu 23991 / unidade 053 foi localizado, porém a troca de tipo por HTTP retornou Erro Processamento. A coleta de Ração e Grãos não foi agendada sem validação. A cobertura histórica é exibida explicitamente na tela. O robô de movimentação existente não foi substituído pelo ZIP recebido.

## Histórico oficial de pesagem (09/11/2026)
O formulário foi validado com os cabeçalhos Origin/Referer corretos. O erro anterior de preparação por HTTP foi resolvido. Robô integrado: Agrosys_Extractor/Transbrasilia/robo_pesagem_dupla.py, tipos 1 e 3, unidade 053, todas as operações, data de pesagem, canceladas desmarcadas. Ele confirma arquivo, unidade, período e tipo, grava processo e retoma sem duplicar pedido.

Coleta histórica em duas contas paralelas: Automacao/Agenda_2h/historico_ocupacao_20261109.py. Meses de janeiro a 08/11/2026; falhas são registradas no Telegram e tentadas novamente ao final. O histórico de Frango já existente foi conferido e é reutilizado. Atualizações periódicas permanecem pausadas por solicitação do usuário.

Importações oficiais são atômicas por modalidade/período, com registro em ocupacao_cargas e cópia de segurança dos registros substituídos. Capacidades históricas conhecidas são preservadas por pesagem; novos registros usam cadastro de capacidade e as exclusões da referência. O relatório informa o avanço da cobertura Agrosys por modalidade.

Gráfico alinhado à Movimentação de Aves: Frango separado por Ave Nova e Real Alimentos, pontos preenchidos, rótulos percentuais de duas casas, rolagem somente quando necessária, clique no ponto ou eixo temporal filtrando o detalhe. A tabela de períodos fica em painel separado. A tela atualiza a cada 60 segundos sem perder filtros.


## Regra de Ração — 09/11/2026

A coleta continua obtendo todas as operações para auditoria. O indicador inclui somente operações de remessa de ração (`REM.RACAO ...`), com as placas e capacidades cadastradas. Devoluções e sobras ficam armazenadas, identificadas e excluídas tanto da carga quanto da capacidade. A regra é uniforme de janeiro em diante; o resumo digitado no Excel não é usado como dado de entrada. A capacidade não se repete nas linhas da mesma pesagem. Meta: 96,00%.

Histórico classificado por operação e conferido com a origem. Julho: 15.460.276 / 15.764.000 = 98,07%; agosto: 97,23%; setembro: 97,22%. Auditoria e backup anteriores à alteração em `C:\BI_Granja\Logs\Transbrasilia_Ocupacao_20261109`.
