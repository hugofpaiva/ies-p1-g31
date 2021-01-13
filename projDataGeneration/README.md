# Initializing generator's data sets:

**Script sends the following message:**
```json
{
    "type": "initialize-people-request" 
}
```

**Then, Processing Layer will send the following message:**
```json
{
    "type": "initialize-people-response",
    "data": [ nif1, nif2, nif3,...]
}
```

**If data list is returned empty, then BD is empty: script must initialize data!**

**In that case, script sends the following three messages:**
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

**If the data field returns a list with elements inside, then the last three messages would not be sent**

**Instead, the script sends the following message**
```json
{
    "type": "initialize-products-request"
}
```

**Then, Processing Layer will respond with the following message**
```json
{
    "type": "initialize-products-response",
    "data": {
                id (has to be a string!! in double quotes): stock, 
                ...
            }
}
```

# Possible JSON messages published in topic 'storego-events':

**When the manager updates the max number of people allowed in the store:**

```json
{
    "type": "new-limit",
    "qty": xxx
}
```

  


**When the manager starts selling a new product and adds it to the platform:**

```json
{
    "type": "add-product",
    "id": xxxx,
    "qty": yyyy (initial stock)
}
```

  


**When the manager stops selling a product and removes it from the platform:**

```json
{
    "type": "remove-product", 
    "id": xxxx  
}
```

**When the employee wants to confirm that they restocked a product:**

```json
{
    "type": "restock",
    "id": xxxx, 
    "qty": yyyy (quantity of new items added)
}
```

  


**When the employee accepts a "help-needed" notification:**

```json
{
    "type": "help-given",
    "nif": xxxxxxxxx 
}
```

  


**When a costumer enters the store:**

```json
{
    "type": "entering-store",
    "nif": xxxxxxxxx
}
```


**When a costumer leaves the store:**  

```json
{
    "type": "leaving-store",
	"nif": xxxxxxxxx
}
```

  


**When a costumer adds a product to their cart:**

```json
{
    "type": "adding-product",
    "nif": xxxxxxxxx,
    "idProduct": yyyy,
	"qty": zz
}
```


**When a costumer removes a product of their cart:**

```json
{
    "type": "removing-product",
    "nif": xxxxxxxxx,
    "idProduct": yyyy,
    "qty": zz
}
```

  


**When the costumer asks for help:**

```json
{
    "type": "help-needed",
    "nif": xxxxxxxxx 
}
```
