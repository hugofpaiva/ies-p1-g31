import random
import time
import threading
from kafka import KafkaProducer
import json

#json.loads(str)
#json.dumps(json)

class dataGenerator:
    def __init__(self, clients, products, peopleLimit):
        self.clients = clients              # dictionary {nif: status}
        self.products = products            # dictionary {id: stock}
        self.peopleLimit = peopleLimit
        self.peopleInStore = 0
        self.producer = KafkaProducer(bootstrap_servers='localhost:9092', value_serializer=lambda v: json.loads(json.dumps(v)))

    def getClients(self):
        return self.clients
    
    def getRandomClient(self):
        return random.choices(list(self.clients.keys()))

    def setPeopleLimit(self, peopleLimit):
        self.peopleLimit = peopleLimit
    
    def newProduct(self, id, stock):
        self.products[id] = stock

    def eraseProduct(self,id):
        del self.products[id]

    def restock(self, id, stock):
        self.products[id] += stock

    def wasHelped(self, client_nif):
        if self.clients[client_nif][0] == 2:
            client_cart = self.clients[client_nif][1]
            self.clients[client_nif] = (1, client_cart)

    def enterStore(self, client_nif):
        self.clients[client_nif] = (1,{})   # setting status to 'inside' with empty cart
        self.peopleInStore += 1
        if self.peopleInStore == self.peopleLimit:
            msg = '{"type": "reached-limit"}'
            producer.send('costumer-events', msg)
        
        msg = {"type": "entering-store", "nif": client_nif}
        producer.send('costumer-events', msg)

    def leaveStore(self, client_nif):
        msg = {"type": "leaving-store", "nif": client_nif, "cart": self.clients[client_nif][1]}
        producer.send('costumer-events', msg)
        self.peopleInStore -= 1
        self.clients[client_nif] = (0,{})   # setting status to 'outside' with empty cart

    def addProduct(self, client_nif):
        available_prods = []
        for prod in self.products.keys():               # populating the array of avaliable products with all products that have stock
            if self.products[prod] != 0:
                available_prods.append(prod)
        product = random.choice(available_prods)        # choosing a random avaliable product
        qty = random.randint(1,self.products[product]+1)# choosing a random quantity that has to be less than the existing stock
        
        client_cart = self.clients[client_nif][1]
        if product not in client_cart:                  # adding product + quantity to client cart
            client_cart[product] = 0
        client_cart[product] += qty

        self.products[product] -= qty

        print("client " + str(client_nif) + " adding product " + str(product) + " in quantity " + str(qty))
        print(self.clients)
        print(self.products)
        msg = {"type": "adding-product", "nif": client_nif, "id": product, "qty": qty}
        producer.send('costumer-events', msg)    
    
    def removeProduct(self, client_nif):
        client_cart = self.clients[client_nif][1]       # choosing a random product from the cart
        product = random.choice(list(client_cart.keys()))
        qty = random.randint(1,client_cart[product]+1)  # choosing a random quantity from product quantity inside the cart

        if qty == client_cart[product]:     # if we chose to remove the full quantity, then delete product from the cart
            del client_cart[product]
        else:                               # if we only chose to remove a few items of the product, update its quantity in the cart
            client_cart[product] -= qty

        self.products[product] += qty
        print("client " + str(client_nif) + " deleting product " + str(product) + " in quantity " + str(qty))
        print(self.clients)
        print(self.products)
        msg = {"type": "removing-product", "nif": client_nif, "id": product, "qty": qty}
        producer.send('costumer-events', msg)

    def askForHelp(self, client_nif):
        client_cart = self.clients[client_nif][1]
        self.clients[client_nif] = (2, client_cart)
        msg = {"type": "help-needed", "nif": client_nif}
        producer.send('costumer-events', msg)
        waiting_time = random.randint(5,10)     # clients wait for the employee for a few time
        time.sleep(waiting_time)
        print("timeout for " + str(client_nif))
        if self.clients[client_nif][0] == 2:    # after that, if their request still hasn't been attended they leave the store without any product 
            client_cart = self.clients[client_nif][1]
            self.clients[client_nif] = (3,client_cart)
            self.emptyCart(client_nif)
            self.leaveStore(client_nif)
            print("client " + str(client_nif) + " angerily leaving store")
            print(self.clients)
    
    def emptyCart(self, client_nif):
        client_cart = self.clients[client_nif][1]
        prods = list(client_cart.keys())
        for prod in prods:
            msg = {"type": "removing-product", "nif": client_nif, "id": prod, "qty": self.clients[client_nif][1][prod]}
            producer.send('costumer-events', msg)
            del client_cart[prod]
    
    def action(self, client_nif):
        client_status = self.clients[client_nif][0]
        client_cart = self.clients[client_nif][1]

        if client_status == 0 and self.peopleInStore < self.peopleLimit:    # if client is outside a not-full store 
            self.enterStore(client_nif)     # the client can only enter the store 
            print("client " + str(client_nif) + " entering the store")
            print(self.clients)
        elif client_status == 1 or client_status == 2:             # if client is inside the store
            choices = ["leave", "add_product", "remove_product", "wait"]
            if client_status == 1:
                choices.append("ask_for_help")
            action = random.choice(choices) # chooses a pseudo-random action
            if action == "leave":           # the client can leave the store 
                self.leaveStore(client_nif)
                print("client " + str(client_nif) + " leaving the store")
                print(self.clients)
            elif action == "add_product":   # the client could also add a product to the cart
                self.addProduct(client_nif)
            elif action == "remove_product" and bool(client_cart):  # the client can only remove a product from the cart if it's not empty
                self.removeProduct(client_nif)
            elif action == "ask_for_help":
                t = threading.Thread(target=self.askForHelp, args = [client_nif])
                t.start()
                print("client " + str(client_nif) + " asked for help")
            elif action =="wait":
                print("waiting")