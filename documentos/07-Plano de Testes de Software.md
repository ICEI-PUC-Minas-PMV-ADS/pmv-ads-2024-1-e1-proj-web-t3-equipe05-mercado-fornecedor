# Plano de Testes de Software

[Apresente os cenários de testes a serem utilizados na realização dos testes da aplicação. Escolha cenários de testes que demonstrem os requisitos sendo atendidos. ]

Os testes funcionais a serem realizados na aplicação são descritos a seguir. [Utilize a estrutura abaixo para cada caso de teste]

|Caso de Teste    | CT-X - Título Caso de Teste |
|:---|:---|
| Requisitos Associados | RF-X |
| Objetivo do Teste | Descrição do objetivo do teste |
| Passos | Indicar passos para a execução do teste |
| Critérios de êxito | Indicar os critérios de êxito  |
| Responsável pela elaborar do caso de Teste | Nome do integrante da equipe |


|Caso de Teste    | CT-05: Verificar a listagem de pedidos do fornecedor |
|:---|:---|
| Requisitos Associados | RF-05:	O usuário do tipo fornecedor deverá ter acesso a lista com todos os seus pedidos em andamento ou finalizados |
| Objetivo do Teste | Verificar se os pedidos do fornecedor estão sendo listados corretamente |
| Passos | 1. Acessar a página de login da aplicação<br/> 2. Realizar login com um usuário do tipo fornecedor<br/> 3.Acessar a lista de pedidos do fornecedor<br/> 4. Verificar se todos os pedidos estão sendo listados corretamente<br/> 5. Verificar se os detalhes do pedido estão sendo exibidos ao clicar no botão "ver mais"<br/> 6. Verificar a exibição da lista em resoluções menores|
| Critérios de êxito | Todos os pedidos devem ser listados corretamente, em resoluções mobile e desktop; deve ser possível visualizar detalhes dos pedidos.  |
| Responsável pela elaborar do caso de Teste | Lorena |

|Caso de Teste    | CT-07: Verificar a geração de relatórios do usuário |
|:---|:---|
| Requisitos Associados | RF-07:	Permitir a visualização de relatórios de custo de suprimentos totais e por cada fornecedor em um período |
| Objetivo do Teste | Verificar se os relatórios de custos/faturamento estão sendo gerados corretamente |
| Passos | 1. Acessar a página de login da aplicação<br/> 2. Realizar login com um usuário<br/> 3.Acessar a página "minha conta"<br/> 4. Acessar o menu "Relatórios e estatísticas"<br/> 5. Verificar se as tabelas contendo os relatórios de custo/faturamento são exibidas<br/> 6. Verificar se o botão "exportar tabela" exporta um arquivo em formato .xlsx|
| Critérios de êxito | 1. As tabelas devem conter o custo/faturamento mês a mês, de acordo com o ano selecionado no menu.<br/> 2. O botão "exportar tabela" deve gerar o download de um arquivo .xlsx contendo a tabela de custo/faturamento do ano selecionado.  |
| Responsável pela elaborar do caso de Teste | Lorena |

|Caso de Teste    | CT-08: verificar a página de usuário|
|:---|:---|
| Requisitos Associados | RF-08:	O usuário deve ser capaz de adicionar uma imagem a sua marca, de remover sua conta da aplicação, e de fazer logout da aplicação. |
| Objetivo do Teste | Verificar se a conta do usuário permite que ele personalize-a de acordo com a sua vontade |
| Passos | 1. Começar pela página de login<br/> 2. Cadastrar os dados solictados <br/> 3.Direcionar-se para a página "minha conta"<br/> 
| Critérios de êxito | 1. Qunado o usuário apertar em apagar, sua cona deve ser excluída.<br/> 2. | Quando o usuário apertar em logout, ele deve sair da página. <br/> 3. | Quando o usuário apertar em editar, a foto deve ser trocada.  
| Responsável pela elaborar do caso de Teste | Safira |

 
> **Links Úteis**:
> - [IBM - Criação e Geração de Planos de Teste](https://www.ibm.com/developerworks/br/local/rational/criacao_geracao_planos_testes_software/index.html)
> -  [Teste de Software: Conceitos e tipos de testes](https://blog.onedaytesting.com.br/teste-de-software/)
> - [Criação e Geração de Planos de Teste de Software](https://www.ibm.com/developerworks/br/local/rational/criacao_geracao_planos_testes_software/index.html)
> - [Ferramentas de Test para Java Script](https://geekflare.com/javascript-unit-testing/)
> - [UX Tools](https://uxdesign.cc/ux-user-research-and-user-testing-tools-2d339d379dc7)
