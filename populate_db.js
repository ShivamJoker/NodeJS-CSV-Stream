import faker from "faker";
import cliProgress from "cli-progress";
import { db } from "./db.js";

const populate = async () => {
  try {
    if (await db.schema.hasTable("users")) {
      console.log("Table already exists, misson aborted 😱");
      return process.exit();
    }

    console.log("--------- Creating Table 💪 ---------");
    await db.schema.createTable("users", (table) => {
      table.increments();
      table.string("name");
      table.string("email");
      table.string("city");
      table.string("phone");
      table.timestamps(true, true);
    });

    console.log("--------- Populating 5M fake people 🤖 ---------");

    console.time("Took");

    const progressBar = new cliProgress.SingleBar(
      { hideCursor: false },
      cliProgress.Presets.rect
    );

    const row_count = 5_000_000;

    progressBar.start(row_count, 0);

    for (let i = 0; i < row_count; i++) {
      await db("users").insert({
        name: faker.name.findName(),
        email: faker.internet.email(),
        city: faker.address.city(),
        phone: faker.phone.phoneNumber(),
      });

      progressBar.update(i);
    }

    progressBar.stop();

    console.log("--------- Done populating 🎉 ---------");
    console.timeEnd("Took");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit();
  }
};

populate();
