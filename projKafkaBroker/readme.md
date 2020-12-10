# Setting up Kafka (and Zookeeper) with Docker

[Referência](https://medium.com/trainingcenter/apache-kafka-codificação-na-pratica-9c6a4142a08f)


**Pré-requisitos**
- Docker CE
- Docker Compose
- git

## Instalando e iniciando o Kafka

Para iniciar o Kafka utilizaremos um arquivo docker-compose criado e mantido pela Confluent, disponível no [DockerHub](https://hub.docker.com/u/confluentinc) 

O ficheiro *docker-compose.yml* tem declarado os serviços e ao corrê-lo irá instalar e inicializar os serviços *Zookeeper* e o *Kafka*.

Para executar o ficheiro **.yml** e correr os serviços em segundo plano:
```bash
$ docker-compose up -d
```

Para verificar se os serviços estão a execução corretamente (portas devem estar 'Up' e estado deve ser 'run'):
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
- python
- pip
- venv

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

