# Configuração de *Kafka* (e *Zookeeper*) com *Docker*

**Pré-requisitos**
- _Docker CE_
- _Docker Compose_
- _git_

## Instalação e início do Kafka

Para iniciar o _Kafka_ utilizaremos um ficheiro _docker-compose_ criado e mantido pela _Confluent_, disponível no [DockerHub](https://hub.docker.com/u/confluentinc) 

O ficheiro *docker-compose.yml* tem declarado os serviços e ao executar irá instalar e iniciar os serviços *Zookeeper* e o *Kafka*.

Para executar o ficheiro **.yml** e correr os serviços em segundo plano:
```bash
$ docker-compose up -d
```

Para verificar se os serviços estão em execução corretamente (portas devem estar 'Up' e estado deve ser 'run'):
```bash
$ docker-compose ps

Resultado esperado:
Name                         Command            State   Ports
----------------------------------------------------------------
kafka-single-node_kafka_1       /etc/confluent/docker/run   Up
kafka-single-node_zookeeper_1   /etc/confluent/docker/run   Up
```


## Criando um tópico

O comando abaixo cria um *Topic* chamado *storego-events*:
```bash
$ docker-compose exec kafka kafka-topics --create --topic storego-events --partitions 1 --replication-factor 1 --if-not-exists --zookeeper zookeeper:2181
```

O comando abaixo confirma se o tópico *storego-events* foi criado:
```bash
$ docker-compose exec kafka kafka-topics --describe --topic storego-events --zookeeper zookeeper:2181
```

### Produzindo mensagem com o *Producer*
O comando abaixo irá enviar 53 mensagens para o tópico:
```bash
$ docker-compose exec kafka bash -c "seq 53 | kafka-console-producer --request-required-acks 1 --broker-list localhost:9092 --topic storego-events && echo 'Produced 53 messages.'"
```

Se tudo funcionar corretamente, receberá uma mensagem como a abaixo:
```bash
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Produced 53 messages.
```

### Consumindo mensagens com o *Consumer*
O comando abaixo irá ler as mensagens enviadas para o tópico:
```bash
$ docker-compose exec kafka kafka-console-consumer --bootstrap-server localhost:9092 --topic storego-events --from-beginning --max-messages 53
```

Se tudo funcionar corretamente, receberá uma mensagem como a abaixo:
```bash
1
....
....
53
Processed a total of 53 messages
```


## Publicar/Consumir dados em python

### Producer

Pré-requisitos:
- _python_
- _pip_
- _venv_

1. Criar o *virtual enviroment*:
```bash
$ python3 -m venv venv
```
2. Activar o *virtual enviroment*:
```bash
$ source venv/bin/activate
```
3. Instalar o pacote *kafka-python*:
```bash
$ pip install kafka-python
```
[Biblioteca *kafka-python*](https://kafka-python.readthedocs.io/en/master/)

Exemplo de código do *Producer*:
```bash
from kafka import KafkaProducer
import json
import random
from time import sleep
from datetime import datetime

# Create an instance of the Kafka producer
producer = KafkaProducer(bootstrap_servers='localhost:9092',
                            value_serializer=lambda v: str(v).encode('utf-8'))

# Call the producer.send method with a producer-record
print("Ctrl+c to Stop")
while True:
    sleep(2)
    producer.send('storego-events', "alert"+str(random.randint(1,999)))
```
O **KafkaProducer** é inicializado com dois parâmetros:
- *bootstrap-servers*: A lista dos brokers que serão enviadas as mensagens, o broker **'localhost:9092'** que está configurado no **docker-compose.yml**.
- *value_serializer*: O método de serialização das mensagens. Para simplificar, foram transportando como string, mas é comum serializar as mensagens usando JSON.
O método *producer.send()* é utilizado para enviar as mensagens, o primeiro parâmetro é o tópico e o segundo é a mensagem. Se o tópico ainda não existir, a configuração do Broker está para “auto-criar” caso não exista.

### Consumer 

Exemplo de código do *Consumer*:
```bash
from kafka import KafkaConsumer

# Create an instance of the Kafka consumer
consumer = KafkaConsumer('storego-events')
for msg in consumer:
    print("Topic name=%s, Message=%s"%(msg.topic,msg.value))
```

## Publicar/Consumir para o Spring

### Consumir

Utilizart o model class *Person*.

Criar a classe *Config* e as anotações *@Configuration* e *@EnableKafka*. Criar as beans *ConsumerFactory* e *ConcurrentKafkaListenerContainerFactory* com a classe *Person*.
```bash
@EnableKafka
@Configuration
public class Config {

    // Function to establish a connection
    // between Spring application
    // and Kafka server
    @Bean
    public ConsumerFactory<String, Person>
    personConsumer()
    {

        // HashMap to store the configurations
        Map<String, Object> map
                = new HashMap<>();

        // put the host IP in the map
        map.put(ConsumerConfig
                        .BOOTSTRAP_SERVERS_CONFIG,
                "127.0.0.1:9092");

        // put the group ID of consumer in the map
        map.put(ConsumerConfig
                        .GROUP_ID_CONFIG,
                "id");
        map.put(ConsumerConfig
                        .KEY_DESERIALIZER_CLASS_CONFIG,
                StringDeserializer.class);
        map.put(ConsumerConfig
                        .VALUE_DESERIALIZER_CLASS_CONFIG,
                JsonDeserializer.class);

        // return message in JSON formate
        return new DefaultKafkaConsumerFactory<>(
                map, new StringDeserializer(),
                new JsonDeserializer<>(Person.class));
    }

    @Bean
    public ConcurrentKafkaListenerContainerFactory<String,
                Person>
    personListner()
    {
        ConcurrentKafkaListenerContainerFactory<String,
                Person>
                factory
                = new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(personConsumer());
        return factory;
    }
}
```

Criar a classe *KafkaService* com  a anotação *@Service*. Esta classe vai conter o método listener para publicar a mensagem no terminal.
```bash
@Service
public class StoreServices {

    // Annotation required to listen
    // the message from Kafka server
    @KafkaListener(topics = "JsonTopic",
            groupId = "id", containerFactory
            = "personListner")
    public void
    publish(Person person)
    {
        System.out.println("New Entry: "
                + person);
    }
}
```

Correr o Spring no terminal para receber as mensagens produzidas.
```bash
$ ./mvnw spring-boot:run
```


### Produzir

Para teste vamos produzir uma mensagem utilizando um ficheiro *people.json*.
No terminal, entrar na bash do container kafka.
```bash
$ docker exec -it projkafkabroker_kafka_1 bash
```

Criar o ficheiro *people.json*.
```bash
$ cat > people.json
{ "firstName": "Giovane", "lastName": "Matos", "email": "gmatos@mail.com" }
{ "firstName": "Luisa", "lastName": "Martins", "email": "martins@mail.com" }
{ "firstName": "Andre", "lastName": "Ferreira", "email": "ferreira@mail.com" }
{ "firstName": "Paulo", "lastName": "Loredo", "email": "loredo@mail.com" }
{ "firstName": "Joana", "lastName": "Paiva", "email": "paiva@mail.com" }
{ "firstName": "Jesus", "lastName": "Carvalho", "email": "carv@mail.com" }
```

Produzir mensagem 
```bash
$ cat people.json | kafka-console-producer --request-required-acks 1 --broker-list localhost:9092 --topic JsonTopic && echo 'Produced json message.'
```

Resultado esperado no terminal do Spring:
```bash
New Entry: Person{, firstName='Giovane', lastName='Matos', email='gmatos@mail.com'}
New Entry: Person{, firstName='Luisa', lastName='Martins', email='martins@mail.com'}
New Entry: Person{, firstName='Andre', lastName='Ferreira', email='ferreira@mail.com'}
New Entry: Person{, firstName='Paulo', lastName='Loredo', email='loredo@mail.com'}
New Entry: Person{, firstName='Joana', lastName='Paiva', email='paiva@mail.com'}
New Entry: Person{, firstName='Jesus', lastName='Carvalho', email='carv@mail.com'}
```


> **Referências**
>
> [Apache Kafka](https://medium.com/trainingcenter/apache-kafka-codificação-na-pratica-9c6a4142a08f)
