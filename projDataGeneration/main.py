from kafka import KafkaConsumer, KafkaProducer
from kafka.structs import TopicPartition
from dataGenerator import dataGenerator
import threading
import random
import time
import json
import argparse
import concurrent.futures


def sendMessage(producer, topic, msg):
    try:
        producer.send(topic, msg)
    except Exception as e:
        print(e)
        print('\033[95m' + "[Producer] Failed to send message!" + '\033[0m')
        time.sleep(5)
        sendMessage(topic, msg)

def readMessages(generator):
    consumer = None
    while consumer is None:
        try:
            consumer = KafkaConsumer('storego-events', bootstrap_servers=['localhost:9092'],
                                     auto_offset_reset='latest',
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
    people = {}
    products = {}
    producer = None
    while producer is None:
        try:
            producer = KafkaProducer(
                bootstrap_servers='kafka:29092', value_serializer=lambda v: json.dumps(v).encode('utf-8'))
        except:
            print('\033[95m' + "[Initialization Producer] Kafka Broker is not available!" + '\033[0m')
            time.sleep(5)

    people_consumer = None
    while people_consumer is None:
        try:
            people_consumer = KafkaConsumer('initialization', bootstrap_servers=['kafka:29092'],
                                    auto_offset_reset='latest', value_deserializer=lambda x: (x.decode('utf-8')))
        except:
            print('\033[95m' + "[People Consumer] Kafka Broker is not available!"+ '\033[0m')
            time.sleep(5)

    first_message = {"type": "initialize-people-request"}
    sendMessage(producer, "initialization", first_message)
    isInitializer = 1
    for record in people_consumer:
        try:
            msg = json.loads(record.value)
        except:
            continue
        if msg["type"] == "initialize-people-response":
            if msg["data"]:
                for nif in msg["data"]:
                    people[nif] = (0, {})
                isInitializer = 0
            people_consumer.close()
            break

    if isInitializer:
        people_to_send = {732421123: ["Isadora Loredo", "isa@ua.pt", "abc"],
                    261546474: ["Maria Furtado", "furtado.maria@ua.pt", "abc"],
                    390615322: ["Pedro Carreira", "pedro.carr@ua.pt", "abc"],
                    877039422: ["Carlos Teixeira", "teixeira@ua.pt", "abc"],
                    335851952: ["João Pedrosa", "joao.pedro@ua.pt", "abc"],
                    639918632: ["Mariana Baião", "mar.b1983@ua.pt", "abc"],
                    818386478: ["Carla Filipa", "carla.filipa@ua.pt", "abc"],
                    411383247: ["Filomena Malato", "f.malato@ua.pt", "abc"],
                    630114163: ["José Matos", "jose.m@ua.pt", "abc"],
                    111900377: ["Catarina Paiva", "cat@ua.pt", "abc"]}
    
        for nifs in people_to_send:
            people[nifs] = (0, {})

        message_people = {
                        "type": "initialize-people",
                        "data": people_to_send
                        }

        category_to_send = ["Categoria1", "Categoria2", "Categoria3", "Categoria4", "Categoria5"]

        message_category = {
                            "type": "initialize-categories",
                            "data": category_to_send
                            }

        product_to_send = {1402: [10.00, "Produto1", "Descrição", 100, 5, "Categoria1"],
                        3719: [10.00, "Produto2", "Descrição", 288, 5, "Categoria1"],
                        3867: [10.00, "Produto3", "Descrição", 49, 5, "Categoria1"],
                        1716: [10.00, "Produto4", "Descrição", 353, 5, "Categoria1"],
                        2621: [10.00, "Produto5", "Descrição", 943, 5, "Categoria1"],
                        1539: [10.00, "Produto6", "Descrição", 334, 5, "Categoria1"],
                        4245: [10.00, "Produto7", "Descrição", 400, 5, "Categoria1"],
                        5364: [10.00, "Produto8", "Descrição", 23, 5, "Categoria1"],
                        1170: [10.00, "Produto9", "Descrição", 340, 5, "Categoria1"],
                        5192: [10.00, "Produto10", "Descrição", 120, 5, "Categoria1"],
        }

        # starting our product representation
        for pid in product_to_send:
            products[pid] = product_to_send.get(pid)[3]

        message_product = {
                            "type": "initialize-products",
                            "data": product_to_send
                        }
        sendMessage(producer, "initialization", message_people)
        sendMessage(producer, "initialization", message_category)
        sendMessage(producer, "initialization", message_product)
    else:
        product_consumer = None
        while product_consumer is None:
            try:
                product_consumer = KafkaConsumer('initialization', bootstrap_servers=['kafka:29092'],
                                        auto_offset_reset='latest',
                                        enable_auto_commit=True, value_deserializer=lambda x: (x.decode('utf-8')))
            except:
                print('\033[95m' + "[People Consumer] Kafka Broker is not available!"+ '\033[0m')
                time.sleep(5)
        
        second_message = {"type": "initialize-products-request"}
        sendMessage(producer, "initialization", second_message)

        for record in product_consumer:
            try:
                msg = json.loads(record.value)
            except:
                continue
            if msg["type"] == "initialize-products-response":
                prod_dictionary = msg["data"]
                for pid in prod_dictionary:
                    products[int(pid)] = prod_dictionary.get(pid)
                product_consumer.close()
                break

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