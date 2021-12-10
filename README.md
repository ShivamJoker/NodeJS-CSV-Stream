# Simple NodeJS CSV Streaming
Using fastify and knex to stream million rows from postgres

## Performance Report
<img width="1061" alt="Screenshot 2021-12-10 at 2 19 05 PM" src="https://user-images.githubusercontent.com/23727670/145544982-c8965e38-9cab-4a0e-9f6c-541b7a40a904.png">

### Find more details on [google sheet](https://docs.google.com/spreadsheets/d/1fW14L0qW3At7Fzuuj3NCXHW19gMwTkY-4vxD6M8XjOI/edit?usp=sharing)

Check `/benchmark` directory for more

### Instructions

1. Fill your database details in `db.js`
2. Set the rows you need in `populate_db.js` default is 5M
3. Populate your DB by running `yarn populate`
4. Start server `yarn start`

### Download the data of fake fat users
(Visit in browser)

Without Streams
http://localhost:3000/

Using Streams
http://localhost:3000/stream

