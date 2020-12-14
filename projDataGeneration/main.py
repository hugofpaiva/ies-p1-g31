from kafka import KafkaConsumer
from dataGenerator import dataGenerator
import threading
import random
import time
import json


def readMessages(generator):
    consumer = None
    while consumer is None:
        try:
            consumer = KafkaConsumer('storego-events', bootstrap_servers=['kafka:9092'],
                                     auto_offset_reset='earliest',
                                     enable_auto_commit=True, value_deserializer=lambda x: json.loads(x.decode('utf-8')))
        except:
            print('\033[95m' + "[Consumer] Kafka Broker is not available!"+ '\033[0m')
            time.sleep(5)

    for msg in consumer:
        print("New message received: " + msg)

        if msg["type"] == "new-limit":
            value = msg["qty"]
            generator.setPeopleLimit(value)

        elif msg["type"] == "add-product":
            pid = msg["id"]
            stock = msg["qty"]
            generator.newProduct(pid, stock)

        elif msg["type"] == "remove-product":
            pid = msg["id"]
            generator.eraseProduct(pid)

        elif msg["type"] == "restock":
            pid = msg["id"]
            qty = msg["qty"]
            generator.restock(pid, qty)

        elif msg["type"] == "help-given":
            nif = msg["nif"]
            generator.wasHelped(nif)


def main():
    # starting our people representation with everyone outside the store
    people = {732421123: (0, {}),
              261546474: (0, {}),
              390615322: (0, {}),
              877039422: (0, {}),
              335851952: (0, {}),
              639918632: (0, {}),
              818386478: (0, {}),
              411383247: (0, {}),
              630114163: (0, {}),
              111900377: (0, {})}

    # starting our product representation
    products = {1402: 100,
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
        t = random.randint(0, 2)
        time.sleep(t)
        person = generator.getRandomClient()[0]
        generator.action(person)


if __name__ == "__main__":
    main()
