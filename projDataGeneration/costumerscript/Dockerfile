FROM python:3

ADD main.py /

ADD dataGenerator.py /

ADD run.sh /

RUN pip install kafka-python

#CMD ["dockerize-wait", "tcp://kafka:9092", "-timeout 20"]

#CMD ["./run.sh"]

CMD ["python", "./main.py" ]
