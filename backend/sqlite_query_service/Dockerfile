FROM python:3

EXPOSE 8080

WORKDIR /usr/src/app

COPY . /usr/src/app/
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

CMD ["python", "./main.py"]