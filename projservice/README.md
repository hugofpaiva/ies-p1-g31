# projservice

Para construir esta aplicação recorremos à *framework* Spring Boot.



## Correr aplicação

Antes de correr a aplicação, é necessário garantir que as bases de dados MySQL e MongoDB estão a correr e disponíveis nas respetivas portas. 

> Para saber como estas podem ser inicializadas, recomenda-se a consulta do ficheiro `/projDB/readme.md`.

Uma vez assegurada esta condição, basta executar o comando abaixo para correr a aplicação.

```bash
$ ./mvnw spring-boot:run
```

Se a compilação não foi interrompida por nenhum erro, esta deve ficar disponível na porta `8080` do `localhost`.