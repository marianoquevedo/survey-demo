# Survey hero

Simple application created to learn Hapi v17 and docker-compose.

## Overview

This an example application that consists of the following components:

- A simple survey API with it's corresponding database
- A dashboard service that acts as an aggregator with it's corresponding database

### Simple survey service

This is a REST API created with Hapi v17. The service allows a client to create a survey model, questions, and answers.

#### Endpoints definition

**POST** `/surveys`  
*Creates a survey model.*

```
curl -X "POST" "http://localhost:3000/surveys" \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
  "title": "Client satisfaction survey",
    "description": "A survey to check how we are doing",
    "questions": [
        {
            "text": "Describe how you feel about our product"
        },
        {
            "text": "What do you like the most about our product?"
        }
    ]
}'
```

Response

```json
{
    "id": 1,
    "title": "Client satisfaction survey",
    "description": "A survey to check how we are doing",
    "questions": [
        {
            "id": 1,
            "text": "Describe how you feel about our product"
        },
        {
            "id": 2,
            "text": "What do you like the most about our product?"
        }
    ]
}
```

**GET** `/surveys`  
*Returns an array of the last 15 surveys*

>`curl "http://localhost:3000/surveys"`

Response

```json
{
    "id": 1,
    "title": "Client satisfaction survey",
    "description": "A survey to check how we are doing",
    "questions": [
        {
            "id": 1,
            "text": "Describe how you feel about our product"
        },
        {
            "id": 2,
            "text": "What do you like the most about our product?"
        }
    ]
}
```

**POST** `/surveys/{survey id}/response`  
*Saves the response of a survey*

```
curl -X "POST" "http://localhost:3000/surveys/2/response" \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
    "country": "Germany",
    "responses": [
        {
            "questionId": 1,
            "text": "I love it!"
        },
        {
            "questionId": 2,
            "text": "Customer service"
        }
    ]
}'
```

Response

```json
{
    "id": 1,
    "country": "Germany",
    "responses": [
        {
            "id": 5,
            "text": "I love it!"
        },
        {
            "id": 6,
            "text": "Customer service"
        }
    ]
}
```

**GET** `/surveys/export`  
*Returns an array with all surveys responses. Used by the dashboard service*

`curl "http://localhost:3000/surveys/export"`

Response

```json
{
    "id": 1,
    "country": "Germany",
    "responses": [
        {
            "id": 5,
            "question_id": 1,
            "text": "I love it!"
        },
        {
            "id": 6,
            "question_id": 2,
            "text": "Customer service"
        }
    ]
}
```

### Dashboard service

This is a REST API created with Hapi v17.
For now it only performs the aggregation of the information return from the survey-api and saves it to the dashboard database.
The information is saved to a table that stores the payload returned from the survey API in a JSONB field.

## How to run this project

- you will need docker and docker-compose
- run `docker-compose up`

Docker-compose will build the images and run the containers.
There are 2 migrations steps on the process that will run the migrations for the SQL databases.

## Technology/frameworks used

- NodeJS and Hapi  
    *Node provides a way to create lightweight, fast, and scalable REST APIs.
    Hapi is an API framework for Node that's easy to setup and extend, thanks to it's plugin oriented architecture. It's configuration based and provides many features out of the box like authorization and authentication.*

- Postgres and massive-js  
    *Survey data can be modeled pretty easily as relational data. Postgres offers a enterprise-level SQL engine out of the box without too much configuration. I also choose Postgres due to my experience with it and the JSONB capabilities that I planned to use on the dashboard service
    Massive provides a lightweight data mapper for Postgres, it's easy to use and doesn't come with all baggage classic ORM add to a project (custom DSL, state, models, etc) *

- Docker compose  
    *Docker compose allows me to run all services that are part of the application with just one command. Also it provides a way to provision Postgres without performing any local installation*

## Next steps/ features missing

- add endpoints to the dashboard service to retrieve the aggregation data.
- create a service specific for aggregation and remove the aggregation logic from the dashboard API.
- add a "complex" survey service with a more complex schema and handle those differences in the aggregation service.
- add unit testing.
- add authentication and authorization
- fix race condition the first time the Postgres image is created.
