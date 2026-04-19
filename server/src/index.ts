/** @format */

import dotenv from "dotenv";
dotenv.config();
import connectDB from "./db";
import app from "./server";

const PORT = Number(process.env.PORT) || 5000;

const startServer = (async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT} !`);
  });
})();
