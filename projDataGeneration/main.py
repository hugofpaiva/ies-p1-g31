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
            consumer = KafkaConsumer('storego-update', bootstrap_servers=['kafka:29092'],
                                    auto_offset_reset='latest', enable_auto_commit=True, value_deserializer=lambda x: (x.decode('utf-8')))
        except:
            print('\033[95m' + "[Consumer] Kafka Broker is not available!"+ '\033[0m')
            time.sleep(5)
    
    for msg in consumer:
        try:    
            msg = json.loads(msg.value)
            print("New message received: " + str(msg))
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
        except:
            print("Error on message: "+str(msg))
            continue

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
            people_consumer = KafkaConsumer('storego-update', bootstrap_servers=['kafka:29092'],
                                    auto_offset_reset='earliest', enable_auto_commit=True, value_deserializer=lambda x: (x.decode('utf-8')))
        except:
            print('\033[95m' + "[People Consumer] Kafka Broker is not available!"+ '\033[0m')
            time.sleep(5)

    first_message = {"type": "initialize-people-request"}
    sendMessage(producer, "storego-new", first_message)
    isInitializer = True
    for record in people_consumer:
        try:    
            print(record.value)
            msg = json.loads(record.value)
        except:
            print("Error on message: "+str(record))
            continue 
        if msg["type"] == "initialize-people-response":
            if 'data' in msg:
                for nif in msg["data"]:
                    people[nif] = (0, {})
                isInitializer = False
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
                    111900377: ["Catarina Paiva", "cat@ua.pt", "abc"],
                    732441123: ["Mateus Taveiro", "mat@ua.pt", "abc"],
                    262546474: ["Catarina Carvalho", "carvalho.catarina@ua.pt", "abc"],
                    392615322: ["Bruna Miranda", "bruna.mir@ua.pt", "abc"],
                    872039422: ["Joana Coimbra", "coimbra@ua.pt", "abc"],
                    332851952: ["Mariana Lima", "mari.ana@ua.pt", "abc"],
                    632918632: ["Luís Magalhães", "lulu.m1999@ua.pt", "abc"],
                    812386478: ["Rita Branco", "br.rita@ua.pt", "abc"],
                    412383247: ["Hugo Matos", "m.hugo@ua.pt", "abc"],
                    632114163: ["Maria Santos", "maria.s@ua.pt", "abc"],
                    112900377: ["Gonçalo Gomes", "gg@ua.pt", "abc"]}

        print(len(people_to_send))
        for nifs in people_to_send:
            people[nifs] = (0, {})

        message_people = {
                        "type": "initialize-people",
                        "data": people_to_send
                        }
        sendMessage(producer, "storego-new", message_people)

        category_to_send = [{"id":1, "name":"Snacks"}, {"id":2, "name":"Premade Meals"}, {"id":3, "name":"Drinks"}, {"id":4, "name":"Coffee"}, {"id":5, "name":"Alcohol"}, {"id":6, "name":"Grocery"}, {"id":7, "name": "Bakery"}]

        message_category = {
                            "type": "initialize-categories",
                            "data": category_to_send
                            }
        print(len(category_to_send))
        sendMessage(producer, "storego-new", message_category)

        product_to_send = {1402: [3.00, "Prosperity Sandwich", "A beautiful sandwich with three tiers of meat and tomatoes and mushrooms for that extra savoury flavour, topped with a creamy cheese souce that will make you cry for more!", 10000, 5, 1],
                        3719: [8.00, "Mexican Bean Burrito", "A Mexican fiesta of a recipe, these vegetable-filled burritos are packed full of flavour and texture. This is the perfect hearty vegetarian meal to fill you up.", 10000, 5, 2],
                        3867: [5.00, "Pack of 10 Pink Lady Apples", "High quality apples, medium to large size. Beautiful variety with a pink blush overlayed on greenish-yellow undertones.", 10000, 5, 6],
                        1716: [2.00, "Pack of 2 Hard Boiled Eggs", "Two chicken eggs, cooked with their shells unbroken so that the egg white and egg yolk both solidify into a creamy soft delight.", 10000, 5, 1],
                        2621: [1.00, "Baguette", "Long, thin loaf of French of lean dough bread, distinguishable by its length and tasty crisp crust.", 10000, 5, 7],
                        1539: [4.00, "Pack of Four Croissants", "Buttery viennoiserie pastry, made of a layered yeast-leavened dough. The process results in a tasty layered, flaky texture.", 10000, 5, 7],
                        4245: [6.00, "Greek Yogurt Parfait", "Delicious rich Greek Yogurt, topped with fresh fruits, nuts, granola, and superfoods for a perfect start to the day!", 10000, 5, 2],
                        5364: [6.00, "Plain Bagel", "A bagel shaped by hand into the form of a ring from wheat dough. The result is a dense, chewy, doughy interior with a browned and crisp exterior, topped with poppy seeds.", 10000, 5, 7],
                        1170: [4.55, "Mocha Frappuchino", "Roast Frappuchino coffee with Mocha sauce, milk and ice all for a flavor that'll leave you wanting more.", 10000, 5, 4],
                        5192: [2.50, "Orange Juice", "This orange juice is balanced in natural sweetness and acidity. The fresh, sharp, zesty aroma overwhelms those looking for a subtler taste, and it's matched in flavour.", 10000, 5, 3],
                        2513: [7.25, "Banh Mi Sandwich", "Originating on the streets of Saigon, the Banh Mi Sandwich is a French-Vietnamese.", 10000, 5, 1],
                        4820: [9.99, "Chicken Shawarma Wrap", "This grilled Wrap is inspired by middle eastern street food where chicken is marinated in spices and then roasted.", 10000, 5, 2],
                        4979: [15.00, "Rosemary Focaccia", "Our round Focaccia is perfectly soft, fluffy and satisfyingly chewy.", 10000, 5, 7],
                        2825: [11.95, "Classic Cobb Salad", "A composed salad with bacon, avocado, chicken breast, tomato, hard boiled egg and chives, arranged on a bed of romaine, Boston, frisée lettuce and watercress.", 10000, 5, 2],
                        3732: [12.00, "Nourishing Quinoa Bowl", "Super filling but also incredibly healthy lunch bowl!", 10000, 5, 2],
                        2641: [5.71, "Small Pack Of Sushi", "This Pack provides an excellent selection of five different sushi styles – two vegetarian and three seafood-based.", 10000, 5, 2],
                        5356: [6.36, "Pineapple Soda", "A sweet blend of fresh pineapple and sparkling water to make a tangy refreshing drink. A delicious tropical delight! It contains very little sugar, so that it remains a healthy option while always tasty.", 10000, 5, 3],
                        6475: [3.20, "Sour Cream And Onion Chips", "These thick chips are cooked slowly and the result is a flavorful chip that tastes fresh and has a very good texture.", 10000, 5, 1],
                        2281: [6.10, "Pack Of 5 Limes", "Our limes are sour, round, and bright green citrus fruits. They’re nutritional powerhouses — high in vitamin C, antioxidants, and other nutrients.", 10000, 5, 6],
                        6203: [25.92, "Hefeweizen Beer", "Arguably one of the most recognizable beer styles, the German-style hefeweizen offers a striking beer experience thanks to the use of distinctive wheat malt, unique yeast and uncharateristic appearance.", 10000, 5, 5],
                        3626: [21.53, "Hahn Pinot Noir", "Pinot Noir is the world’s most popular light-bodied red wine. It’s loved for its red fruit, flower, and spice aromas that are accentuated by a long, smooth finish.", 50, 5, 1]}   

        # starting our product representation
        for pid in product_to_send:
            products[pid] = product_to_send.get(pid)[3]
        print(len(product_to_send))
        message_product = {
                            "type": "initialize-products",
                            "data": product_to_send
                        }
        
        
        sendMessage(producer, "storego-new", message_product)

        people_done = False
        categories_done = False
        products_done = False

        for record in people_consumer:
            try:    
                print(record.value)
                msg = json.loads(record.value)
            except:
                print("Error on message: "+str(record))
                continue 
            if msg["type"] == "initialize-done-people":
                people_done = True
            elif msg["type"] == "initialize-done-categories":
                categories_done = True
            elif msg["type"] == "initialize-done-products":
                products_done = True
            if people_done and categories_done and products_done:
                break



    else:
        product_consumer = None
        while product_consumer is None:
            try:
                product_consumer = KafkaConsumer('storego-update', bootstrap_servers=['kafka:29092'],
                                        auto_offset_reset='earliest',
                                        enable_auto_commit=True, value_deserializer=lambda x: (x.decode('utf-8')))
            except:
                print('\033[95m' + "[People Consumer] Kafka Broker is not available!"+ '\033[0m')
                time.sleep(5)
        
        second_message = {"type": "initialize-products-request"}
        sendMessage(producer, "storego-new", second_message)

        for record in product_consumer:
            try:
                msg = json.loads(record.value)
            except:
                print("Error on message: "+str(record))
                continue
            if msg["type"] == "initialize-products-response":
                prod_dictionary = msg["data"]
                for pid in prod_dictionary:
                    products[int(pid)] = prod_dictionary.get(pid)
                product_consumer.close()
                break
    

    generator = dataGenerator(people, products, 10)
    th = threading.Thread(target=readMessages, args=(generator,))
    th.start()
    while True:
        t = random.randint(0, 1)
        time.sleep(t)
        person = generator.getRandomClient()[0]
        generator.action(person)

if __name__ == "__main__":
    main()