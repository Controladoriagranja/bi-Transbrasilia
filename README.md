# Transbrasilia — Movimentação Detalhada de Aves

Visão do portal BI para Ave Nova (10) e Real Alimentos (111). Os dados são consultados na API protegida pela sessão e pelas permissões da CENTRAL. Este repositório contém somente a interface, sem dados empresariais ou credenciais.

## Origem e cálculo

Excel oficial do Agrosys, programa wpcf002d / wpcf002r. Histórico inicial: aba Banco Dados de Acompanhamento Frango Vivo 2026. Aves e mortos são somados; mortalidade é a razão entre essas somas. Peso e durações usam média simples, como na planilha. A ajuda da visão explica as colunas. Observações manuais ficam separadas dos dados coletados.

## Operação

O robô está no ambiente BI em `Agrosys_Extractor/Transbrasilia/robo_movimentacao_aves.py`, e o importador em `PortalBI/BI_Transbrasilia_novo/etl/movimentacao_aves_store.py`. A agenda existente executa o setor a cada duas horas, dentro da janela diária, inclusive finais de semana, consultando os dois últimos dias. As unidades são coletadas sequencialmente para não solicitar o mesmo relatório ao mesmo tempo. Processos pendentes são retomados pela conta original.

Exemplo de conferência sem baixar: `py robo_movimentacao_aves.py --modo dias --dias 2 --planejar`.

Tabelas: `transbrasilia.movimentacoes`, `transbrasilia.cargas` e `transbrasilia.observacoes`. A carga substitui somente o período e a unidade consultados em uma transação; falha de leitura preserva a carga anterior. Filtros personalizados produzem arquivos separados e não substituem a base geral.

## Publicação

GitHub Pages na branch main, pasta raiz. Acesso pelo relatório Movimentação Detalhada de Aves do setor Transbrasilia na CENTRAL.
