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
