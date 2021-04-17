<p align="center">
  <img  src="/reports/images/logo_transparent_resized.png">
</p>

<p align="center">
Sistema de monitorização de clientes e produtos de uma loja física e automatização de compras
</p>

<hr>

<p align="center">

<a href="https://youtu.be/6S7CLQYnE50">
    <img src="/reports/images/demo.gif" alt="Demo">
  </a>

> Vídeo de uma demo disponível ao clicar na imagem
</p>

## Sobre o projeto

O sistema tem a finalidade de simular a gestão de uma loja automatizada, ou seja, um estabelecimento que proporciona uma experiência de compras sem caixas de pagamento, ao reconhecer os produtos que um cliente retirou da prateleira e efetuar a cobrança no momento em que ele deixa a loja.

Ao chegar ao supermercado é detetada a sua entrada na loja e, através dos sensores distribuídos pelo espaço, são adicionados produtos ao seu carrinho virtual ou removidos se este os voltar a pousar. Terminadas as compras, não é preciso fazer nada: apenas sair da loja. Uma vez do lado de fora da loja a compra é finalizada.

> Todos os dados referidos anteriormente, no contexto da disciplina de IES, são simulados e gerados automaticamente.

Esta aplicação é similar ao supermercado inteligente da _Amazon_ com o conceito “Just Walk Out“, sem filas e sem ​checkouts​.


## Backlog 
Foi utilizado o _Jira_ para planear e documentar o projeto. É possível encontrar informação nos links abaixo:

`Jira` (planeamento) https://hugofpaiva.atlassian.net/browse/IES

`Confluence` (documentação) https://hugofpaiva.atlassian.net/wiki/spaces

> [`/Project: IES`](https://hugofpaiva.atlassian.net/wiki/spaces/IES) Pasta do projeto
>
> [`/Iteration 1`](https://hugofpaiva.atlassian.net/wiki/spaces/I1/overview) Documentos relacionados com a iteração 1 

## Aquitetura

<p align="center">
  <img  src="/reports/images/architecture.png">
</p>

### Componentes

- [**Aplicação Web (React)**](./projreact)
- [**Serviço (Spring Boot)**](./projservice)
- [**Geração de Dados (Python)**](./projDataGeneration)
- [**Message Broker (Kafka)**](./projKafkaBroker) - Informação de pesquisa e exemplos
- [**Base de Dados (MySQL e MongoDB)**](./projDB) - Informação de pesquisa e exemplos

## Como executar

Para executar o sistema em `localhost` é necessário ter o _Docker Compose_ instalado e atualizado.

Posto isto, os passos são os seguintes:

1. Compilar o código do **serviço** em _Spring Boot_, tornando-o em um formato distribuível, executando dentro da pasta do projeto deste serviço o seguinte comando:
   
    ```
    $ mvn -DskipTests clean package
    ```
    
2. Compilar os serviços para a executação dos _containers Docker_ executando na raiz do repositório:
   
    ```
    $ docker-compose build
    ```
    
3. Iniciar os _containers_:
    
    ```
    $ docker-compose up -d
    ```
    
A **aplicação Web** ficará disponível em: [localhost](http://localhost)

## _Deploy_ do sistema

A disponibilização do sistema foi feita através da _Google Cloud Platform_ e de acordo com [este guião](https://cloud.google.com/community/tutorials/docker-compose-on-container-optimized-os), utilizando o _free tier_. Resumidamente, foi criada uma _VM_, clonado o repositório e executado o _Docker Compose_ de acordo com o guião e com a versão _1.27.4_ para suportar a versão _3.8_ do ficheiro _Compose_. Por fim, nas definições de _Firewall_, foram abertas as portas 80 e 8080 para permitir o acesso à aplicação _web_ e serviço, respetivamente.

A informação relativa ao _deploy_ de cada componente do sistema encontra-se na sua pasta sendo que foi utilizado um [ficheiro](./docker-compose.yml) _Docker Compose_ para definir e correr os múltiplos _Docker Containers_ dos componentes do sistema, da mesma forma descrita anteriormente.

Tendo em conta que as configurações de _CORS_ e o endereço da _API_ à qual o _React_ acede são diferentes do `localhost`, na branch `deploy` encontra-se o sistema pronto para deploy na nossa máquina virtual.

**Aplicação Web disponível em:** [35.246.117.113](http://35.246.117.113) (o máximo de clientes da loja está definido como apenas um para evitar esgotar o armazenamento, sendo possível alterar)



## Detalhes

É possível encontrar todos os detalhes no [Relatório do Trabalho](/reports/relatorio_final.pdf).

 ## Nota

Classificação individual referente ao trabalho de grupo de **20** valores em 20.
