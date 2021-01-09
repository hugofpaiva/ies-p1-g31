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

## Swagger

Utilizando a ferramenta _Swagger_, foi possível documentar automáticamente os diversos _endpoints_ do serviço, de acordo com os requisitos do professor.

É de notar que, alguns _endpoints_, para permitir paginação e outras _features_, retornam um `Map<String, Object>`, permitindo inserir informação como o número total de produtos, a página atual e, como é de esperar, os objetos daquele _endpoint_, não fazendo distinção se os mesmos são Produtos, Categorias... 

**Nestes casos, o _Swagger_ acaba por não documentar da maneira correta, faltando alguns modelos.**

A interface do _Swagger_ encontar-se-à em [http://localhost:8080/api/swagger-ui/index.html](http://localhost:8080/api/swagger-ui/index.html) caso seja executada a aplicação em `localhost.
