## Installation

```bash
$ yarn install 
```

## Running the app

```bash
Simply run the following commands 

# run prefill
$ yarn run prefill

# run app
$ yarn run start:dev

# Note: .env file already exists.

```

## API Endpoints 

###### POST /appointments/book

This endpoint allows you to book an empty slot in a doctor's schedule.


Request Body

```javascript
{
  "userId": uuid,
  "doctorId": uuid,
  "slot": date
}
```
Response

```javascript
{   
    "message": string,
    "appointment": {
        "id": uuid,
        "userId": uuid,
        "doctorId": uuid,
        "slot": date,
        "createdAt": date,
        "updatedAt": date
    }
}
```