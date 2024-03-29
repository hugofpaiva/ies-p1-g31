# Base de dados

São utilizados dois tipos de bases de dados: _MySQ_ e _MongoDB_. Ambas são _deployed_ em _containers Docker_. Para este efeito, criou-se um ficheiro `docker-compose.yml` para se poder fazer *deploy* de ambos em simultâneo com recurso à ferramenta _Docker Compose_.

Este ficheiro cria um *container* para cada um dos tipos de base de dados criados, em ambos com a palavra-passe `rootpass` para o administrador (utilizador `root`).



## 1. Inicializar o Docker

Antes de avançar com qualquer configuração, o _Docker_ deve ser inicializado sem permissões de utilizador.

```bash
$ systemctl --user start docker.service
```



## 2. Criar containers

Para criar os *containers*, o ficheiro com as configurações deve ser validado.

```bash
$ docker-compose config
```

Se não forem mostrados erros, pode avançar-se com a sua criação.

```bash
$ docker-compose up -d
```

> `-d` para ser executado em segundo plano.

> PROBLEMA COMUM
>
> Caso o MySQL esteja constantemente a reiniciar, deve ser eliminada a pasta que garante a sua persistência em `~/docker/mysql`. Deve ser tido em atenção que esta operação vai eliminar dados guardados previamente na base de dados.



## 3. Testar conexão às bases de dados

### MySQL

Para efeitos de teste da conectividade à base de dados, foi criado o script Python que se encontra na pasta mysql/testMySQL.py.

Este deve ser executado com os parâmetros user e password.

```bash
# Exemplo para o utilizador 'root', com palavra-passe 'password'
$ python testMysql.py 'root' 'password'
```

O início do output, em caso de sucesso, deve ser semelhante ao disponibilizado abaixo.

```
Connecting to db...
Connected!
<mysql.connector.connection_cext.CMySQLConnection object at 0x7fdeda1c9250>
```

O restante simula a adição de dados caso a tabela de testes ainda não tenha sido criada. Em ambos os cenários, devem ser mostradas três linhas da tabela customers.

```
2.6. The data on that table is...
('Person1', 'Aveiro')
('Person2', 'Coimbra')
('Person3', 'Porto')
```



### MongoDB

A base de dados deverá de ficar disponível na porta 27017 do localhost.

```bash
# Autenticação com o utilizador 'root' com palavra-passe 'password'
$ mongo --port 27017 --username root --password password --authenticationDatabase admin
# Autenticação com dados de acesso do spring boot
$ mongo ies --port 27017 --username spring --password springpass
```

Para testar o seu funcionamento, pode ser feita a importação da coleção de amostra com restaurantes, disponível [aqui](https://github.com/ozlerhakan/mongodb-json-files/blob/master/datasets/restaurant.json).

```bash
$ mongoimport --port 27017 --username root --password password --authenticationDatabase admin --db ies_test --collection rest --drop --file ./mongodb/restaurant.json 
```

No cliente de da linha de comandos do Mongo.

```javascript
use ies_test
db.rest.count()
// Deve retornar 2548
```



> **Referências**
>
> [Docker Hub MySQL](https://hub.docker.com/_/mysql)
>
> [Docker Hub Mongo](https://hub.docker.com/_/mongo)
