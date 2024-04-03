# Especificação do Projeto

## Perfis de Usuários


<table>
<tbody>
<tr align=center>
<th colspan="2">Perfil Fornecedor </th>
</tr>
<tr>
<td width="150px"><b>Descrição</b></td>
<td width="600px">Fornecedores que desejam participar de processos de cotações ou licitações</td>
</tr>
<tr>
<td><b>Necessidades</b></td>
<td>-	Ter os pedidos dos clientes de forma centralizada pois fazem o controle no WhatsApp, dificultando a organização dos pedidos de cada cliente
-	Não querem utilizar mais planilhas para gestão dos clientes, como cadastro, status do pedido, marca, modelo, pois tem alto volume de dados e não funciona de forma versátil.
-	Ter um ambiente para anexo de notas fiscais, para que o cliente consiga de imediato conferir se o pedido está certo e já conseguir imprimi-la
</td>
</tr>
</tbody>
<tbody>
<tr align=center>
<th colspan="2">Perfil Cliente </th>
</tr>
<tr>
<td width="150px"><b>Descrição</b></td>
<td width="600px">Clientes que desejam adquirir produtos com preços competitivos e de qualidade com maior abrangência de fornecedores e organização no processo de cotação. </td>
</tr>
<tr>
<td><b>Necessidades</b></td>
<td>-	Agilidade na resposta dos fornecedores nos seus pedidos de compra.
-	Não utilizar mais planilhas, pois não tem uma organização dos fornecedores e cotações com uma interface bem definida
-	O uso de planilhas, deixa os dados muito subdivido e não tem uma aba de filtros adequado para pesquisar de forma rápida a cotação à medida que forem preenchendo 
</td>
</tr>
</tbody>
</table>


## Histórias de Usuários




|EU COMO... `QUEM`   | QUERO/PRECISO ... `O QUE` |PARA ... `PORQUE`                 |
|--------------------|---------------------------|----------------------------------|
| Fornecedor                 | Inutilizar planilhas para controle das cotações dos clientes                       | Melhoria no alto volume de dados separado por guias                              |
| Cliente                  | Cliente 	Não usar o WhatsApp para contato com fornecedor	Evitar perda no controle dos pedidos feitos, devido ter muitas conversas                       | Cliente 	Não usar o WhatsApp para contato com fornecedor	Evitar perda no controle dos pedidos feitos, devido ter muitas conversas                              |
| Fornecedor                | Fornecedor	Que os pedidos não sejam mais feitos por e-mail e WhatsApp	Agilidade no atendimento dos pedidos                       | Fornecedor	Que os pedidos não sejam mais feitos por e-mail e WhatsApp	Agilidade no atendimento dos pedidos                              |
| Cliente                | Cliente	Ter opção de anexo de notas fiscais	Agilidade na importação interna de compra                       | Cliente	Ter opção de anexo de notas fiscais	Agilidade na importação interna de compra                              |
| Cliente                | Cliente	Consultar pedidos por período	Controlar a quantidade de produtos que forem comprando                       | Cliente	Consultar pedidos por período	Controlar a quantidade de produtos que forem comprando                              |
| Fornecedor                | Fornecedor	Controle no status da solicitação	Evitar se perderem qual cliente já foi atendido                       | Fornecedor	Controle no status da solicitação	Evitar se perderem qual cliente já foi atendido                              |


## Requisitos do Projeto



### Requisitos Funcionais


|ID    | Descrição                | Prioridade |
|-------|---------------------------------|----|
| RF-01 |  A aplicação deve permitir que o pedido apareça para todos os fornecedores, para que o cliente verifique os melhores preços | Média | 
| RF-02 |  A aplicação deve apresentar campo de status no andamento das requisições | Baixa |
| RF-03 |  O sistema deve permitir anexar mais produtos caso falte na requisição já em aberto | Alta |
| RF-04 |  A aplicação deve permitir que o cliente visualize o cadastro de todos os fornecedores para ciência da marca da mercadoria que cotarão | Média |
| RF-05 |  A aplicação deve conter notificações no perfil do cliente, quando houver resposta dos fornecedores  | Alta   |
| RF-06 |  Conter campo de informações complementares | Baixa |
| RF-07 |  Permitir a visualização de relatórios de custo de suprimentos totais e por cada fornecedor em um período. | Média |
| RF-08 |  A aplicação deve fornecer um campo para anexo das XMLS e PDF’S das notas emitidas para o cliente | Alta  |
| RF-09 |  No perfil de fornecedor, permitir filtragem de todos os pedidos feitos por cliente | Alta |
| RF-10 |  No perfil de cliente, permitir apenas a pesquisa pelo número do pedido  | Alta |

**Prioridade: Alta / Média / Baixa. 

### Requisitos não Funcionais



|ID      | Descrição               |Prioridade |
|--------|-------------------------|----|
| RNF-01 |  Facilidade de navegar pelo sistema.                    | Média   | 
| RNF-02 |  O sistema deve estar disponível em diferentes dispositivos                    | Baixa   | 
| RNF-03 |  A aplicação deve ser responsiva                    | Alta   | 
| RFN-04 |  O sistema deve funcionar 24/7                    | Alta   | 
| RFN-05 |  Contraste legível entre cor da fonte e do fundo                    | Média   | 

**Prioridade: Alta / Média / Baixa. 

 

 

