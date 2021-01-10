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
            consumer = KafkaConsumer('storego-events', bootstrap_servers=['kafka:29092'],
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
            people_consumer = KafkaConsumer('storego-events', bootstrap_servers=['kafka:29092'],
                                    auto_offset_reset='latest', value_deserializer=lambda x: (x.decode('utf-8')))
        except:
            print('\033[95m' + "[People Consumer] Kafka Broker is not available!"+ '\033[0m')
            time.sleep(5)

    first_message = {"type": "initialize-people-request"}
    sendMessage(producer, "costumer-events", first_message)
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
                    111900377: ["Catarina Paiva", "cat@ua.pt", "abc"],
                    732421123: ["Mateus Taveiro", "mat@ua.pt", "abc"],
                    261546474: ["Catarina Carvalho", "carvalho.catarina@ua.pt", "abc"],
                    390615322: ["Bruna Miranda", "bruna.mir@ua.pt", "abc"],
                    877039422: ["Joana Coimbra", "coimbra@ua.pt", "abc"],
                    335851952: ["Mariana Lima", "mari.ana@ua.pt", "abc"],
                    639918632: ["Luís Magalhães", "lulu.m1999@ua.pt", "abc"],
                    818386478: ["Rita Branco", "br.rita@ua.pt", "abc"],
                    411383247: ["Hugo Matos", "m.hugo@ua.pt", "abc"],
                    630114163: ["Maria Santos", "maria.s@ua.pt", "abc"],
                    111900377: ["Gonçalo Gomes", "gg@ua.pt", "abc"]}

    
        for nifs in people_to_send:
            people[nifs] = (0, {})

        message_people = {
                        "type": "initialize-people",
                        "data": people_to_send
                        }

        category_to_send = [{"id":1, "name":"Snacks"}, {"id":2, "name":"Premade Meals"}, {"id":3, "name":"Drinks"}, {"id":4, "name":"Coffee"}, {"id":5, "name":"Alcohol"}, {"id":6, "name":"Grocery"}, {"id":7, "name": "Bakery"}]

        message_category = {
                            "type": "initialize-categories",
                            "data": category_to_send
                            }

        product_to_send = {1402: [3.00, "Prosperity Sandwich", "A beautiful sandwich with three tiers of meat and tomatoes and mushrooms for that extra savoury flavour, topped with a creamy cheese souce that will make you cry for more!", 10000, 5, 1],
                        3719: [8.00, "Mexican Bean Burrito", "A Mexican fiesta of a recipe, these vegetable-filled burritos are packed full of flavour and texture. This is the perfect hearty vegetarian meal to fill you up.", 10000, 5, 2],
                        3867: [5.00, "Pack of 10 Pink Lady Apples", "High quality apples, medium to large size. Beautiful variety with a pink blush overlayed on greenish-yellow undertones. The flesh is firm, crisp, and yellow-white, with a tangy and sweet flavor.", 10000, 5, 6],
                        1716: [2.00, "Pack of 2 Hard Boiled Eggs", "Two chicken eggs, cooked with their shells unbroken so that the egg white and egg yolk both solidify into a creamy soft delight.", 10000, 5, 1],
                        2621: [1.00, "Baguette", "Long, thin loaf of French of lean dough bread, distinguishable by its length and tasty crisp crust.", 10000, 5, 7],
                        1539: [4.00, "Pack of Four Croissants", "Buttery viennoiserie pastry, made of a layered yeast-leavened dough. The process results in a tasty layered, flaky texture.", 10000, 5, 7],
                        4245: [6.00, "Greek Yogurt Parfait", "Delicious rich Greek Yogurt, topped with fresh fruits, nuts, granola, and superfoods for a perfect start to the day!", 10000, 5, 2],
                        5364: [6.00, "Plain Bagel", "A bagel shaped by hand into the form of a ring from wheat dough. The result is a dense, chewy, doughy interior with a browned and crisp exterior, topped with poppy seeds.", 10000, 5, 7],
                        1170: [4.55, "Mocha Frappuchino", "Roast Frappuchino coffee with Mocha sauce, milk and ice all for a flavor that'll leave you wanting more. To change things up, we serve it affogato-style with a hot espresso shot poured right over the top.", 10000, 5, 4],
                        5192: [2.50, "Orange Juice", "This orange juice is balanced in natural sweetness and acidity. The fresh, sharp, zesty aroma overwhelms those looking for a subtler taste, and it's matched in flavour.", 10000, 5, 3],
                        2513: [7.25, "Banh Mi Sandwich", "Originating on the streets of Saigon, the Banh Mi Sandwich is a French-Vietnamese hybrid consisting of an airy baguette, sour pickled daikon and carrot, crisp cilantro, spicy chillis, and a cool sliver of cucumber surrounding sweet minced pork.", 10000, 5, 1],
                        4820: [9.99, "Chicken Shawarma Wrap", "This grilled Wrap is inspired by middle eastern street food where chicken is marinated in spices and then roasted on a spit to perfection, then wrapped up in flatbread for a delicious sandwich. Beats fast food any day!", 10000, 5, 2],
                        4979: [15.00, "Rosemary Focaccia", "Our round Focaccia is perfectly soft, fluffy and satisfyingly chewy. It’s sprinkled with lots of fresh rosemary and crunchy flaky sea salt, and drizzled with extra olive oil just before serving, which soaks perfectly into all of those classic little holes poked in the bread. And best of all, it is naturally vegan and it's just the ultimate cozy carbohydrate comfort food. We know you’re going to love it!", 10000, 5, 7],
                        2825: [11.95, "Classic Cobb Salad", "A composed salad with bacon, avocado, chicken breast, tomato, hard boiled egg and chives, arranged on a bed of romaine, Boston, frisée lettuce and watercress.", 10000, 5, 2],
                        3732: [12.00, "Nourishing Quinoa Bowl", "Super filling but also incredibly healthy lunch bowl! It's loaded up with superfoods – beets, broccoli, kale, sweet potatoes, avocado and quinoa – and then some tasty plant-based protein sources like paprika dusted chickpeas, hummus and a creamy cashew dressing.", 10000, 5, 2],
                        2641: [5.71, "Small Pack Of Sushi", "This Pack provides an excellent selection of five different sushi styles – two vegetarian and three seafood-based. Each pack includes Nigiri with shrimp, Nigiri with raw salmon, Maki with avocado and carrot, Maki with smoked Salmon, and Maki with vegetables, so there’s guaranteed to be something to suit everyone’s tastes. We use a special technique when producing the sushi that ensures the rice roll remains moist even after thawing, so you can avoid the issue of dry rice that’s found with so many other suppliers. Each piece holds its shape beautifully, and they remain just as delicious as fresh sushi. ", 10000, 5, 2],
                        5356: [6.36, "Pineapple Soda", "A sweet blend of fresh pineapple and sparkling water to make a tangy refreshing drink. A delicious tropical delight! It contains very little sugar, so that it remains a healthy option while always tasty.", 10000, 5, 3],
                        6475: [3.20, "Sour Cream And Onion Chips", "These thick chips are cooked slowly and the result is a flavorful chip that tastes fresh and has a very good texture.", 10000, 5, 1],
                        2281: [6.10, "Pack Of 5 Limes", "Our limes are sour, round, and bright green citrus fruits. They’re nutritional powerhouses — high in vitamin C, antioxidants, and other nutrients. Because limes are loaded with nutrients, they may help boost your immunity, reduce heart disease risk factors, prevent kidney stones, aid iron absorption, and promote healthy skin.", 10000, 5, 6],
                        6203: [25.92, "Hefeweizen Beer", "Arguably one of the most recognizable beer styles, the German-style hefeweizen offers a striking beer experience thanks to the use of distinctive wheat malt, unique yeast and uncharateristic appearance. This wheat beer breaks from the German beer mold, showcasing yeast-driven fruit and spice as well as bearing an eye-catching mystique. Don’t let the cloudy hefeweizen deter you, this beer is one of the world’s most enjoyable styles for beer geeks and neophytes, alike. The refreshing qualities of this highly-carbonated style have kept it alive for centuries. Try one for yourself and experience why that is, firsthand.", 10000, 5, 5],
                        3626: [21.53, "Hahn Pinot Noir", "Pinot Noir is the world’s most popular light-bodied red wine. It’s loved for its red fruit, flower, and spice aromas that are accentuated by a long, smooth finish.", 10000, 5, 1]}   

        # starting our product representation
        for pid in product_to_send:
            products[pid] = product_to_send.get(pid)[3]

        message_product = {
                            "type": "initialize-products",
                            "data": product_to_send
                        }
        sendMessage(producer, "costumer-events", message_people)
        sendMessage(producer, "costumer-events", message_category)
        sendMessage(producer, "costumer-events", message_product)
    else:
        product_consumer = None
        while product_consumer is None:
            try:
                product_consumer = KafkaConsumer('storego-events', bootstrap_servers=['kafka:29092'],
                                        auto_offset_reset='latest',
                                        enable_auto_commit=True, value_deserializer=lambda x: (x.decode('utf-8')))
            except:
                print('\033[95m' + "[People Consumer] Kafka Broker is not available!"+ '\033[0m')
                time.sleep(5)
        
        second_message = {"type": "initialize-products-request"}
        sendMessage(producer, "costumer-events", second_message)

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
        t = random.randint(0, 1)
        time.sleep(t)
        person = generator.getRandomClient()[0]
        generator.action(person)

if __name__ == "__main__":
    main()