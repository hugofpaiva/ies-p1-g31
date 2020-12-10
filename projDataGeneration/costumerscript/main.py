from kafka import KafkaConsumer
from dataGenerator import *
import random
import time


def readMessages(generator):
        consumer = KafkaConsumer('storego-events')
        while True:
            print("loop")
            for bmsg in consumer:
                msg = json.loads(bmsg.value.decode('utf8'))
                print(msg["type"])
                if msg["type"] == "new-limit":
                        value = msg["qty"]
                        generator.setPeopleLimit(value)
                elif msg["type"] == "add-product":
                        print("2")
                        pid = msg["id"]
                        stock = msg["qty"]
                        generator.newProduct(pid, stock)
                elif msg["type"] == "remove-product":
                        print("3")
                        pid = msg["id"]
                        generator.eraseProduct(pid)
                elif msg["type"] == "restock":
                        print("4")
                        pid = msg["id"]
                        qty = msg["qty"]
                        generator.restock(pid, qty)
                elif msg["type"] == "help-given":
                        print("5")
                        nif = msg["nif"]
                        generator.wasHelped(nif)

def main():
    # time.sleep(20)
    # starting our people representation with everyone outside the store
    producer = KafkaProducer(bootstrap_servers='localhost:9092', api_version=(0, 10), value_serializer=lambda v: json.dumps(v).encode('utf-8'))
    msg = {"type": "initialize-request"}
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
    th = threading.Thread(target=readMessages, args=(generator,))
    th.start()

    while True:
        t = random.randint(0,2)
        time.sleep(t)
        person = generator.getRandomClient()[0]
        generator.action(person)



if __name__ == "__main__":
    main()