# Serviço StoreGO

Para construir esta aplicação recorreu-se à *framework* _Spring Boot_.

## Correr aplicação

Antes de correr a aplicação, é necessário garantir que as bases de dados _MySQL_ e _MongoDB_ estão a correr e disponíveis nas respetivas portas. É também necessário verificar que o _Spring Boot_ está a utilizar os _urls_ corretos destes serviços em `application.properties`.

> Para saber como estas podem ser inicializadas, recomenda-se a consulta do ficheiro `/projDB/readme.md`.

Uma vez assegurada esta condição, basta executar o comando abaixo para correr a aplicação.

```bash
$ ./mvnw spring-boot:run
```

Se a compilação não foi interrompida por nenhum erro, esta deve ficar disponível na porta `8080` do `localhost`.

## Swagger

Utilizando a ferramenta _Swagger_, foi possível documentar automáticamente os diversos _endpoints_ do serviço, de acordo com os requisitos do professor.

É de notar que, alguns _endpoints_, para permitir paginação e outras _features_, retornam um `Map<String, Object>`, permitindo inserir informação como o número total de produtos, a página atual e, como é de esperar, os objetos daquele _endpoint_, não fazendo distinção se os mesmos são Produtos, Categorias... 

**Nestes casos, o _Swagger_ acaba por não documentar da maneira correta, faltando alguns modelos.**

A interface do _Swagger_ encontar-se-à em [http://localhost:8080/api/swagger-ui/index.html](http://localhost:8080/api/swagger-ui/index.html) caso seja executada a aplicação em `localhost.

## Preparar aplicação para o _Deploy_

Antes de ser possível fazer o _deploy_ deve-se alterar os _urls_ dos serviços no ficheiro `application.properties` de modo a estarem associados ao seu nome no _Docker Compose_.
Como título de exemplo, o serviço `Kafka` terá o _url_ `Kafka` dentro da rede interna do _Docker Compose_.

Posteriormente é necessário compilar o código e gerar o seu _jar_:

```bash
$ mvn -DskipTests clean package
```
> Foi utilizada a opção `-DskipTests` para ignorar os testes neste caso pois estes iriam falhar devido aos serviços não estarem disponíveis no _urL_ especificado pois a máquina não está no _Docker Compose_


O ficheiro _Dockerfile_, de acordo com as referências, tem a informação necessária para o _deploy_ deste serviço através do ficheiro _Docker Compose_ na raiz do repositório.


> **Referências**
>
> [Spring Boot Docker](https://spring.io/guides/topicals/spring-boot-docker/)
>
> [Skipping Tests with Maven](https://www.baeldung.com/maven-skipping-tests)
