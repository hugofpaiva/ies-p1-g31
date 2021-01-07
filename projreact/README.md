# StoreGO Aplicação Web

Aplicação React baseada em [Devias Kit Template](https://material-ui.com/store/items/devias-kit/)

## Como executar  

**node.js** é necessário para correr uma aplicação _React_. O guia de instalação pode ser encontrado [aqui](https://nodejs.org/en/).

  Ao instalar o _node.js_, o _npm_ também deve estar instalado no computador. Se preferir utilizar *yarn*, é necessário [instalar](https://classic.yarnpkg.com/en/docs/install/).

  

### Instalar dependências

1. Clonar o repositório

2. ```cd projreact```

3. Instalar as dependências utilizando ```npm install``` **ou** ```yarn install```

  

## Como executar a aplicação _web_

Dento do diretório do projeto, correr o seguinte:

1. ```npm start``` **ou** ```yarn start```

2. A aplicação deve estar a correr em [http://localhost:3000](http://localhost:3000) 

## _Docker_

Foi preparado um ficheiro _Dockerfile_, de acordo com as referências, com a informação necessária para o _deploy_ desta aplicação _React_ através do ficheiro _Docker Compose_ na raiz do repositório.


## Utilização da API do _Spring_

Quando o utilizador é autenticado, o seu token de autenticação é armazenado em armazenamento local com a chave `token`. O seu tipo (MANAGER ou EMPLOYEE) também é armazenado lá, com a `authority` chave.

Para usar a API _Spring_, cada solicitação deve enviar o token de autenticação no cabeçalho.

```react
const requestOptions = {
    method: 'POST',
    headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    body: JSON.stringify({ myjson: 'here' })
};
const response = await fetch('http://127.0.0.1:8080/api/...', requestOptions);
const data = await response.json();
```


> **Referências**
>
> [Use Docker With React](https://medium.com/better-programming/heres-how-you-can-use-docker-with-create-react-app-3ee3a972b04e)
>
> [React Request Examples](https://jasonwatmore.com/post/2020/02/01/react-fetch-http-post-request-examples)
>

