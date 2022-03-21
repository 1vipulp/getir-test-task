# node-microservice - TEST TASK - Vipul Panchal

Hello there, Please follow below steps to run this service locally.
1. run "npm install"
2. run "npm run start:dev"

PS. I have used node v14.0.0 while development, make sure while installing npm modules you are using the same version. Thanks!

## API Endpoint

API Name: Fetch Records
cURL Script
```
curl --location --request POST 'localhost:4000/v1' \
--header 'Content-Type: application/json' \
--data-raw '{
    "startDate": "2015-06-20",
    "endDate": "2015-06-23",
    "minCount": 5000,
    "maxCount": 5050
}'
```
