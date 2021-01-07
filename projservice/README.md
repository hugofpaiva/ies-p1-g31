# Serviço StoreGO

Para construir esta aplicação recorremos à *framework* Spring Boot.

## Correr aplicação

Antes de correr a aplicação, é necessário garantir que as bases de dados MySQL e MongoDB estão a correr e disponíveis nas respetivas portas. 

> Para saber como estas podem ser inicializadas, recomenda-se a consulta do ficheiro `/projDB/readme.md`.

Uma vez assegurada esta condição, basta executar o comando abaixo para correr a aplicação.

```bash
$ ./mvnw spring-boot:run
```

Se a compilação não foi interrompida por nenhum erro, esta deve ficar disponível na porta `8080` do `localhost`.

## Preparar aplicação para o _Deploy_

Antes de ser possível fazer o _deploy_ deve-se alterar os _urls_ dos serviços no ficheiro `application.properties` de modo a estarem associados ao seu nome no _Docker Compose_.
Como título de exemplo, o serviço `Kafka` terá o url `Kafka` dentro da rede interna do _Docker Compose_.

Uma vez feito isto, deve ser compilado o código e gerado o seu _jar_:

```bash
$ mvn -DskipTests clean package
```
> Foi utilizada a opção `-DskipTests` para ignorar os testes neste caso pois estes iriam falhar devido aos serviços não estarem disponíveis no _urL_ especificado pois a máquina não está no _Docker Compose_
