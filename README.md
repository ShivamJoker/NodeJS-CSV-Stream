# Simple NodeJS CSV Streaming
## Using fastify and knex to stream million rows from postgres


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
