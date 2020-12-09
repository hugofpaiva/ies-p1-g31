# Base de dados

Vamos utilizar dois tipos de bases de dados: MySQL e MongoDB. Ambas serão deployed em containers Docker.

Antes de avançar com qualquer configuração, o Docker deve ser inicializado sem permissões de utilizador.

```bash
$ systemctl --user start docker.service
```



## MySQL

### 1. Construir imagem

O Dockerfile e os ficheiros necessários à sua construção estão disponíveis em /projdb/mysql. Para fazer build da imagem do container, deve ser executado o seguinte comando na referida pasta:

```bash
$ docker build --tag mysql .
```

Concluída a construção sem erros, a imagem está pronta a ser corrida.



### 2. Correr a imagem

```bash
$ docker run -p 3306:3306 -d --name ies_mysql mysql:latest
```

> -d Faz com que o container corra em segundo plano



### 3. Alterar a palavra-passe do administrador

O administrador da base de dados terá atribuída uma palavra-passe aleatória por defeito. Esta é impressa no log da construção, que pode ser consultado através do comando abaixo.

```bash
$ docker logs ies_mysql
```

A linha que mostra esta palavra-passe começa por GENERATED ROOT PASSWORD, pelo que pode ser utilizado o | grep GENERATED em conjunto com o comando anterior para facilitar a sua consulta.

Para a alterar, deve aceder-se à bash do container container.

```bash
$ docker exec -it ies_mysql bash
```

Uma vez no container, deve abrir-se o cliente da linha de comandos do MySQL, inserindo a palavra-passe descoberta anteriormente quando pedida.

```bash
$ mysql -uroot -p
```

Uma vez autenticado, deve executar o comando abaixo para alterar a palavra-passe, alterando a 'password' para a palavra-passe desejada.

```mysql
ALTER USER 'root'@'localhost' IDENTIFIED BY 'password';
```



### 4. Criar utilizador com acesso externo

Por defeito, o administrador da BD não lhe pode aceder através do exterior do container. Para tal, vamos criar um utilizador com estas permissões.

No cliente da linha de comandos do MySQL, executado dentro da bash do container (ver passo anterior), deve executar-se o comando abaixo para criar o utilizador e atribuir-lhe permissões.

> Tal como no passo anterior, ‘password’ deve ser substituído pela palavra-passe pretendida.
>
> O '%' autoriza o utilizador a aceder à BD através de qualquer endereço IP. Se este for conhecido, deve ser alterado, de forma a tornar os acessos mais seguros.
>
> O utilizador está a ser criado com todos os privilégios sobre todas as bases de dados. Em produção, estas autorizações devem ser restringidas.

```mysql
CREATE USER 'ies_spring'@'%' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'ies_spring'@'%';
```



### 5. Testar conexão à base de dados

Para efeitos de teste da conectividade à base de dados, foi criado o script Python que se encontra na pasta /projDB/mysql/test/testMySQL.py.

Este deve ser executado com os parâmetros user e password.

```bash
# Exemplo para o utilizador 'ies_spring', com palavra-passe 'password'
$ python testMysql.py 'ies_spring' 'password'
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



> **Referências**
>
> [Repositório com Dockerfile](https://github.com/mysql/mysql-docker/tree/mysql-server/8.0 )
>
> [Trabalhar com o MySQL num container Docker](https://dev.mysql.com/doc/mysql-installation-excerpt/8.0/en/docker-mysql-getting-started.html)
>
> [Criar novo utilizador, com autorização para aceder à BD fora do container](https://stackoverflow.com/a/19101356/10735382)



## MongoDB

### 1. Construir imagem

O Dockerfile e os ficheiros necessários à sua construção estão disponíveis em /projdb/mongodb. Para fazer build da imagem do container, deve ser executado o seguinte comando na referida pasta:

```bash
$ docker build --tag mongodb .
```

Concluída a construção sem erros, a imagem está pronta a ser corrida.



### 2. Correr a imagem

```bash
$ docker run -p 27017:27017 -d --name ies_mongodb mongodb:latest
```

> -d Faz com que o container corra em segundo plano

Se der o erro “Error response from daemon: OCI runtime create failed: container_linux.go:349: starting container process caused "exec: \"docker-entrypoint.sh\": executable file not found in $PATH": unknown.”, devem ser executados os seguintes comandos e repetida a execução.

```bash
$ chmod 777 ./docker-entrypoint.sh
$ ln -s ./docker-entrypoint.sh
```



### 3. Testar conexão à base de dados

A base de dados deverá de ficar disponível na porta 27017 do localhost.

```bash
$ mongo --port 27017
```

Para testar o seu funcionamento, pode ser feita a importação da coleção de amostra com restaurantes, disponível [aqui](https://github.com/ozlerhakan/mongodb-json-files/blob/master/datasets/restaurant.json).

```bash
$ mongoimport --port 27017 --db ies_test --collection rest --drop --file restaurant.json
```

No cliente de da linha de comandos do Mongo.

```javascript
use ies_test
db.rest.count()
// Deve retornar 2548
```



> **Referências**
>
> [Repositório com Dockerfile](https://github.com/docker-library/mongo/tree/fb982041304c66b108192458aba89b33b5bebc60/4.4 )
>
> [Solução para o erro na construção do container](https://github.com/docker-library/postgres/issues/296#issuecomment-308698059)