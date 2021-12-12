FROM python:3

COPY ./requirements.txt /app/requirements.txt

WORKDIR /app

RUN pip install --no-cache-dir -r requirements.txt

COPY . /app

ENV FLASK_ENV=development
ENV FLASK_DEBUG=1

ENTRYPOINT [ "flask", "run" ]