from dataGenerator import *
import random
import time


def main():

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
    
    generator = dataGenerator(people, products)

    while True:
        t = random.randint(0,2)
        time.sleep(t)
        person = generator.getRandomClient()[0]
        generator.action(person)



if __name__ == "__main__":
    main()