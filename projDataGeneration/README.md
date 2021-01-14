# Inicialização de dados do gerador:

**_Script_ envia a seguinte mensagem:**

```json
{
    "type": "initialize-people-request" 
}
```

**Posteriomente, o Serviço envia a seguinte mensagem:**
```json
{
    "type": "initialize-people-response",
    "data": [ nif1, nif2, nif3,...]
}
```

**Se a lista de dados for retornada vazia, então a BD está vazia: o _script_ deve inicializar os dados!**

**Nesse caso, o _script_ envia as três mensagens seguintes:**

```json
{
    "type": "initialize-people",
    "data": {
                nif: [nome, email, pass],
                nif: [nome, email, pass],
                ...
            }
}
```

```json
{
    "type": "initialize-categories",
    "data": [
    { "id":1, "name": categoria1 }, 
    { "id":2, "name": categoria2 },
    ... 
    ]
}
```

```json
{
    "type": "initialize-products",
    "data": {
                id: [preço, nome, descrição, stock, min_stock, idcategoria],
            }
}
```

**Se a lista de dados retornada estiver vazia, as últimas três mensagens não serão enviadas**
**Em vez disso, o _script_ envia a seguinte mensagem:**
```json
{
    "type": "initialize-products-request"
}
```

**Então, o Serviço responderá com a seguinte mensagem:**
```json
{
    "type": "initialize-products-response",
    "data": {
                id (has to be a string!! in double quotes): stock, 
                ...
            }
}
```

# Possíveis mensagens JSON publicadas no tópico 'storego-update':

**Quando o gerente atualiza o número máximo de pessoas permitidas na loja:**
```json
{
    "type": "new-limit",
    "qty": xxx
}
```

**Quando o gerente adiciona um novo produto à plataforma:**
```json
{
    "type": "add-product",
    "id": xxxx,
    "qty": yyyy (initial stock)
}
```

**Quando o gerente deixa de vender um produto e o remove da plataforma:**
```json
{
    "type": "remove-product",
    "id": xxxx
}
```

**Quando o é feito _restock_ de um produto:**
```json
{
    "type": "restock",
    "id": xxxx,
    "qty": yyyy (quantity of new items added)
}
```

**Quando um funcionário resolve um pedido de ajuda:**
```json
{
    "type": "help-given",
    "nif": xxxxxxxxx
}
```

# Possíveis mensagens JSON publicadas no tópico 'storego-new':

**Quando um cliente entra na loja:**
```json
{
    "type": "entering-store",
    "nif": xxxxxxxxx
}
```

**Quando um cliente sai da loja:**
```json
{
	"type": "leaving-store",
	"nif": xxxxxxxxx
}
```
**Quando um cliente adiciona um produto ao carrinho:**
```json
{

	"type": "adding-product",
	"nif": xxxxxxxxx,
	"id": yyyy,
	"qty": zz

}
```

**Quando um cliente remove um produto do seu carrinho:**
```json
{

    "type": "removing-product",
	"nif": xxxxxxxxx,
	"id": yyyy,
	"qty": zz

}
```

**Quando um cliente pede ajuda:**
```json
{
    "type": "help-needed",
    "nif": xxxxxxxxx
}
```
