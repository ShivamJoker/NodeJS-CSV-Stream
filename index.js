import Fastify from "fastify";
import { db } from "./db.js";

const fastify = Fastify({ logger: false });

const setDownloadHeaders = (reply) => {
  reply.raw.setHeader("Content-Type", "text/csv");
  reply.raw.setHeader(
    "Content-Disposition",
    `attachment; filename=fat users ${Date.now()}.csv`
  );
};

const makeCSVheader = (obj) => Object.keys(obj).join(", ") + "\n";
const makeCSVrow = (obj) => Object.values(obj).join(", ") + "\n";

const limit = 1_000_000;

fastify.get("/", async (request, reply) => {
  try {
    const data = await db
      .select()
      .from("users")
      .limit(request.query.limit ?? limit);
    setDownloadHeaders(reply);

    // string will contain whole csv
    let csvData = makeCSVheader(data[0]);
    data.forEach((row) => {
      csvData += makeCSVrow(row);
    });
    return csvData;
  } catch (err) {
    console.error(err);
    return err;
  }
});

fastify.get("/stream", (request, reply) => {
  try {
    const data = db
      .select()
      .from("users")
      .limit(request.query.limit ?? limit)
      .stream();

    setDownloadHeaders(reply);

    let isCSVHeaderSent = false;

    data.on("data", (chunk) => {
      // only set header once
      if (!isCSVHeaderSent) {
        reply.raw.write(makeCSVheader(chunk));
        isCSVHeaderSent = true;
      }
      // console.log(chunk);
      reply.raw.write(makeCSVrow(chunk));
    });

    data.on("finish", () => {
      reply.raw.end();
    });

    request.socket.on("close", () => {
      data.destroy();
    });
  } catch (err) {
    console.error(err);
    return err;
  }
});
// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
