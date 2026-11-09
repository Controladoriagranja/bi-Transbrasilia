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
