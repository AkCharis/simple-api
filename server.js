const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log(err);
  console.log("UNCAUGHT EXCEPTION. Shutting down...");
  process.exit(1);
});

dotenv.config({ path: "./config.env" });

const app = require("./app");

const DB = process.env.DATABASE;

mongoose.connect(DB).then(() => console.log("DB connection successful!"));
// console.log(process.env);

const port = process.env.PORT || 3000;
server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION. Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});
