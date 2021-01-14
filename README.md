# [StoreGO](http://35.246.117.113)

<div style="display: flex; flex-direction: column; justify-content:center; align-items:center">

[![Watch the demo](./reports/images/logo_transparent_resized.png)](https://youtu.be/6S7CLQYnE50)

> Vídeo de uma demo disponível ao clicar na imagem
</div>

**Grupo:** G31

O sistema tem a finalidade de simular a gestão de uma loja automatizada, ou seja, um estabelecimento que proporciona uma experiência de compras sem caixas de pagamento, ao reconhecer os produtos que um cliente retirou da prateleira e efetuar a cobrança no momento em que ele deixa a loja.

Ao chegar ao supermercado é detetada a sua entrada na loja e, através dos sensores distribuídos pelo espaço, são adicionados produtos ao seu carrinho virtual ou removidos se este os voltar a pousar. Terminadas as compras, não é preciso fazer nada: apenas sair da loja. Uma vez do lado de fora da loja a compra é finalizada.

> Todos os dados referidos anteriormente, no contexto da disciplina de IES, são simulados e gerados automaticamente.

Esta aplicação é similar ao supermercado inteligente da Amazon com o conceito “Just Walk Out“, sem filas e sem ​checkouts​.


## Backlog 
Está a ser utilizado o _Jira_ para planear e documentar o projeto. É possível encontrar informação nos links abaixo:

`Jira` (planeamento) https://hugofpaiva.atlassian.net/browse/IES

`Confluence` (documentação) https://hugofpaiva.atlassian.net/wiki/spaces

> [`/Project: IES`](https://hugofpaiva.atlassian.net/wiki/spaces/IES) Pasta do projeto
>
> [`/Iteration 1`](https://hugofpaiva.atlassian.net/wiki/spaces/I1/overview) Documentos relacionados com a iteração 1 

## Aquitetura

![architecture](./reports/images/architecture.png)

### Componentes

- [**Aplicação Web**](./projreact)
- [**Serviço**](./projservice)
- [**Geração de Dados**](./projDataGeneration)
- [**Message Broker (Kafka)**](./projKafkaBroker) - Informação de pesquisa e exemplos
- [**Base de Dados (MySQL e MongoDB)**](./projDB) - Informação de pesquisa e exemplos

## _Deploy_ do sistema

A disponibilização do sistema foi feita através da _Google Cloud Platform_ e de acordo com [este guião](https://cloud.google.com/community/tutorials/docker-compose-on-container-optimized-os), utilizando o _free tier_. Resumidamente, foi criada uma _VM_, clonado o repositório e executado o _Docker Compose_ de acordo com o guião e com a versão _1.27.4_ para suportar a versão _3.8_ do ficheiro _Compose_. Por fim, nas definições de _Firewall_, foram abertas as portas 80 e 8080 para permitir o acesso à aplicação _web_ e serviço, respetivamente.

A informação relativa ao _deploy_ de cada componente do sistema encontra-se na sua pasta sendo que foi utilizado um [ficheiro](./docker-compose.yml) _Docker Compose_ para definir e correr os múltiplos _Docker Containers_ dos componentes do sistema.

**Aplicação Web disponível em:** [35.246.117.113](http://35.246.117.113)
