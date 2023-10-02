require("dotenv");
const fastify = require("fastify")({ logger: true });
const mongoose = require("mongoose");

const allRoutes = require("./src/routes/route");

allRoutes(fastify);

const startServer = async () => {
  try {
    mongoose
    .connect(process.env.MONGO_URI)
    .then(async () => {
      fastify.listen(5000, "0.0.0.0", (err, domain) => {
        if (err) throw err;
        console.log(`server is running on ${domain}`);
      })
    })
    .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
    proccess.exit(1)
  }
}

startServer();