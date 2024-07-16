import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({ path: "./env" });

connectDB()
  .then(() => {
    app.on("error", (err) => {
      console.log("ERRRR", err);
    });

    app.listen(process.env.PORT || 2000, () => {
      console.log("Server is running at the post:" + process.env.PORT);
    });
  })
  .catch((err) => {
    console.log("mongoDB connection failed", err);
  });