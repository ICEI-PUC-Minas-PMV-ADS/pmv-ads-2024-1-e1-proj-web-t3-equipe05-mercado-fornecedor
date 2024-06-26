# Plano de Testes de Software

Os testes funcionais a serem realizados na aplicação são descritos a seguir.

|Caso de Teste    | CT-01: Verificar a lista de pedidos disponíveis para os fornecedores |
|:---|:---|
| Requisitos Associados | RF-01: A aplicação deve permitir que o pedido apareça para todos os fornecedores, para que o cliente verifique os melhores preços |
| Objetivo do Teste | Verificar se o fornecedor tem acesso à lista de pedidos disponíveis e é capaz de enviar cotações corretamente |
| Passos | 1. Realizar login com um usuário do tipo fornecedor<br/> Sugestão de fornecedores:<br/> E-mail: contato@tecnobits.com<br/> Senha: 123456<br />E-mail: contato@escrita.com<br/> Senha: 123456<br /> 2. Acessar a página de pedidos disponíveis da aplicação<br/> 3. Verificar se todos os pedidos estão sendo listados corretamente<br/> 5. Verificar se os detalhes do pedido estão sendo exibidos ao clicar no botão "ver mais"<br/> 6. Verificar a exibição da lista em resoluções menores<br/> 7. Enviar uma cotação através do botão "Enviar cotação"<br/> 8. Verificar se a cotação é listada corretamente no pedido selecionado|
| Critérios de êxito | 1. Todos os pedidos devem ser listados corretamente, em resoluções mobile e desktop<br/> 2. Deve ser possível visualizar detalhes dos pedidos<br/> 3. Deve ser possível enviar cotação com valor e prazo de entrega<br/> 4. Deve ser possível visualizar a cotação enviada junto ao pedido selecionado  |
| Responsável pela elaborar do caso de Teste | Lorena |

 |Caso de Teste    | CT-02: Usuário deve ser capaz de realizar login na aplicação, utilizando seu e-mail e senha.
|:---|:---|
| Requisitos Associados | RF-02:	No perfil de clientes ou fornecedores, deve permitir loguin no site. |
| Objetivo do Teste | Verificar se o campo de loguin entra com e-mail e senha |
| Passos | 1. Começar pela página index<br/> 2. Procurar pela aba para apertar em loguin <br/> 3.Preencher o campo de e-mail senha<br/>  4. Direcionar para a pagina minhaconta.html <br/>  
| Critérios de êxito | 1. Quando o usuário digitar o e-mail e senha cadastrado, deve logar no site.  
| Responsável pela elaborar do caso de Teste | Renato |

 |Caso de Teste    | CT-04 A aplicação deve permitir que o cliente visualize o cadastro de todos os fornecedores;.
|:---|:---|
| Requisitos Associados | RF-04:	O usuário deve conseguir visualizar os fornecedores cadastrados na aplicação. |
| Objetivo do Teste | Verificar se o campo mostra os fornecedores cadastrados. |
| Passos | 1. Começar pela página index<br/> 2. Acessar o campo "fornecedores" <br/> 
| Critérios de êxito | 1. O usuário consegue pesquisar os fornecedores cadastrados.  
| Responsável pela elaborar do caso de Teste | Otavio |

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
| Critérios de êxito | 1. Quando o usuário apertar em apagar, sua conta deve ser excluída.Quando o usuário apertar em logout, ele deve sair da página. Quando o usuário apertar em editar, a foto deve ser trocada.  
| Responsável pela elaborar do caso de Teste | Safira |

|Caso de Teste    | CT-10: verificar se a página de clientes consegue fazer pesquisa|
|:---|:---|
| Requisitos Associados | RF-10:	No perfil de clientes, deve permitir apenas pesquisa pelo número do pedido. |
| Objetivo do Teste | Verificar se o campo de busca mostra os pedidos |
| Passos | 1. Começar pela página de login<br/> 2. Cadastrar os dados solictados <br/> 3.Direcionar-se para a página "minha conta"<br/>  4. Ir no painel de clientes <br/>  5. Clicar no botão de busca e digitar o número do pedido <br/>
| Critérios de êxito | 1. Quando o usuário digitar o número do pedido, o pedido deve aparecer conforme solicitado.  
| Responsável pela elaborar do caso de Teste | Safira |
