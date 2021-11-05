import knex from "knex";

export const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    database: "fat_db",
  },
});
