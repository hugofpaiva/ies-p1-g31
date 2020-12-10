FROM python:3

ADD main.py /

ADD dataGenerator.py /

RUN pip install kafka-python

CMD [ "python", "./main.py" ]
