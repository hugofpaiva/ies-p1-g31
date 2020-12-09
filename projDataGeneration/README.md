Possible JSON messages published in topic 'storego-events':

When the manager updates the max number of people allowed in the store:
{
    "type": "new-limit",
    "qty": xxx
}

When the manager starts selling a new product and adds it to the platform:
{
    "type": "add-product",
    "id": xxxx,
    "qty": yyyy (initial stock)
}

When the manager stops selling a product and removes it from the platform:
{
    "type": "remove-product",
    "id": xxxx
}

# TODO: Check this with Team!
When the employee wants to confirm that they restocked a product:
{
    "type": "restock",
    "id": xxxx,
    "qty": yyyy (quantity of new items added)
}

When the emplyee accepts a "help-needed" notification:
{
    "type":"giving-help",
    "nif": xxxxxxxxx
}


Possible JSON messages published in topic 'client-events':

When the max number of people allowed in the store is reached:
{"type": "reached-limit"}

When a client enters the store:
{
    "type": "entering-store",
    "nif": xxxxxxxxx
}

When a client 

When the manager stops selling a product and removes it from the platform:
{
    "type": "remove-product",
    "id": xxxx
}

# TODO: Check this with Team!
When the employee wants to confirm that they restocked a product:
{
    "type": "restock",
    "id": xxxx,
    "qty": yyyy (quantity of new items added)
}

When the emplyee accepts a "help-needed" notification:
{
    "type":"giving-help",
    "nif": xxxxxxxxx
}