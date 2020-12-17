import random
import time
import threading
from kafka import KafkaProducer
import json


class dataGenerator:
    def __init__(self, clients, products, peopleLimit):
        self.clients = clients              # dictionary {nif: status}
        self.products = products            # dictionary {id: stock}
        self.peopleLimit = peopleLimit
        self.peopleInStore = 0
        self.producer = None
        while self.producer is None:
            try:
                self.producer = KafkaProducer(
                    bootstrap_servers='kafka:29092', value_serializer=lambda v: json.dumps(v).encode('utf-8'))
            except:
                print('\033[95m' + "[Producer] Kafka Broker is not available!" + '\033[0m')
                time.sleep(5)

    def sendMessage(self, topic, msg):
        try:
            self.producer.send(topic, msg)
        except Exception as e:
            print(e)
            print('\033[95m' + "[Producer] Failed to send message!" + '\033[0m')
            time.sleep(5)
            self.sendMessage(topic, msg)

    def getClients(self):
        return self.clients

    def getRandomClient(self):
        return random.choices(list(self.clients.keys()))

    def setPeopleLimit(self, peopleLimit):
        self.peopleLimit = peopleLimit

    def newProduct(self, pid, stock):
        self.products[pid] = stock

    def eraseProduct(self, pid):
        del self.products[pid]

    def restock(self, pid, stock):
        self.products[pid] += stock

    def wasHelped(self, client_nif):
        if self.clients[client_nif][0] == 2:
            client_cart = self.clients[client_nif][1]
            self.clients[client_nif] = (1, client_cart)

    def enterStore(self, client_nif):
        # setting status to 'inside' with empty cart
        self.clients[client_nif] = (1, {})
        self.peopleInStore += 1
        msg = {"type": "entering-store", "nif": client_nif}
        self.sendMessage('costumer-events', msg)

    def leaveStore(self, client_nif):
        msg = {"type": "leaving-store", "nif": client_nif}
        self.sendMessage('costumer-events', msg)
        self.peopleInStore -= 1
        # setting status to 'outside' with empty cart
        self.clients[client_nif] = (0, {})

    def addProduct(self, client_nif):
        # choosing a random avaliable product
        product = random.choice(list(self.products.keys()))
        if self.products[product] == 0:
            return
        elif self.products[product] == 1:
            qty = 1
        else:
            # choosing a random quantity that has to be less than the existing stock
            qty = random.randint(1, self.products[product])

        client_cart = self.clients[client_nif][1]
        if product not in client_cart:                  # adding product + quantity to client cart
            client_cart[product] = 0
        client_cart[product] += qty

        self.products[product] -= qty

        msg = {"type": "adding-product",
               "nif": client_nif, "idProduct": product, "qty": qty}
        self.sendMessage('costumer-events', msg)

    def removeProduct(self, client_nif):
        # choosing a random product from the cart
        client_cart = self.clients[client_nif][1]
        product = random.choice(list(client_cart.keys()))
        # choosing a random quantity from product quantity inside the cart
        if client_cart[product] == 0:
            return
        elif client_cart[product] == 1:
            qty = 1
        else:
            qty = random.randint(1, client_cart[product])

        # if we chose to remove the full quantity, then delete product from the cart
        if qty == client_cart[product]:
            del client_cart[product]
        else:                               # if we only chose to remove a few items of the product, update its quantity in the cart
            client_cart[product] -= qty

        self.products[product] += qty
        msg = {"type": "removing-product",
               "nif": client_nif, "idProduct": product, "qty": qty}
        self.sendMessage('costumer-events', msg)

    def askForHelp(self, client_nif):
        client_cart = self.clients[client_nif][1]
        self.clients[client_nif] = (2, client_cart)
        msg = {"type": "help-needed", "nif": client_nif}
        self.sendMessage('costumer-events', msg)
        # clients wait for the employee for a few time
        waiting_time = random.randint(5, 10)
        time.sleep(waiting_time)
        # after that, if their request still hasn't been attended they leave the store without any product
        if self.clients[client_nif][0] == 2:
            client_cart = self.clients[client_nif][1]
            self.clients[client_nif] = (3, client_cart)
            self.emptyCart(client_nif)
            self.leaveStore(client_nif)

    def emptyCart(self, client_nif):
        client_cart = self.clients[client_nif][1]
        prods = list(client_cart.keys())
        for prod in prods:
            msg = {"type": "removing-product", "nif": client_nif,
                   "id": prod, "qty": self.clients[client_nif][1][prod]}
            self.sendMessage('costumer-events', msg)
            del client_cart[prod]

    def action(self, client_nif):
        client_status = self.clients[client_nif][0]
        client_cart = self.clients[client_nif][1]

        if client_status == 0 and self.peopleInStore < self.peopleLimit:    # if client is outside a not-full store
            # the client can only enter the store
            self.enterStore(client_nif)
        elif client_status == 1 or client_status == 2:             # if client is inside the store
            choices = ["leave", "add_product", "remove_product", "wait"]
            if client_status == 1:
                choices.append("ask_for_help")
            action = random.choice(choices)  # chooses a pseudo-random action
            if action == "leave":           # the client can leave the store
                self.leaveStore(client_nif)
            elif action == "add_product":   # the client could also add a product to the cart
                self.addProduct(client_nif)
            # the client can only remove a product from the cart if it's not empty
            elif action == "remove_product" and bool(client_cart):
                self.removeProduct(client_nif)
            elif action == "ask_for_help":
                t = threading.Thread(target=self.askForHelp, args=[client_nif])
                t.start()
            elif action == "wait":
