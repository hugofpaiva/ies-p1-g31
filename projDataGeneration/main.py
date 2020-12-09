from kafka import KafkaConsumer
from dataGenerator import *
import random
import time


def main():

    consumer = KafkaConsumer('storego-events', fetch_max_wait_ms = 0)
    
    # starting our people representation with everyone outside the store
    people={732421123: (0,{}),
            261546474: (0,{}),
            390615322: (0,{}),
            877039422: (0,{}),
            335851952: (0,{}),
            639918632: (0,{}),
            818386478: (0,{}),
            411383247: (0,{}),
            630114163: (0,{}),
            111900377: (0,{})}

    # starting our product representation
    products={1402: 100,
            3719: 288,
            3867: 49,
            1716: 353,
            2621: 943,
            1539: 334,
            4245: 400,
            5364: 23,
            1170: 340,
            5192: 120}
    
    generator = dataGenerator(people, products, 100)

    while True:
        print("loop")
        for bmsg in consumer:
                print("message:")
                msg = json.loads(bmsg.value.decode('utf8'))
                print(msg)
                if msg["type"] == "new-limit":
                        value = msg["qty"]
                        generator.setPeopleLimit(value)
                elif msg["type"] == "add-product":
                        id = msg["id"]
                        stock = msg["qty"]
                        generator.newProduct(id, stock)
                elif msg["type"] == "remove-product":
                        id = msg["id"]
                        generator.eraseProduct(id)
                elif msg["type"] == "restock":
                        id = msg["id"]
                        qty = msg["qty"]
                        generator.restock(id, qty)
                elif msg["type"] == "giving-help":
                        nif = msg["nif"]
                        generator.wasHelped(nif)
        t = random.randint(0,2)
        time.sleep(t)
        person = generator.getRandomClient()[0]
        generator.action(person)



if __name__ == "__main__":
    main()