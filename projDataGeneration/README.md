
### Possible JSON messages published in topic 'storego-events'

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

  

  


### Possible JSON messages published in topic 'costumer-events'

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



