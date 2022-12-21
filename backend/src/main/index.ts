import express from "express";
import cors from "cors";
import { router } from "./Routes";
import dotenv from "dotenv";

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

dotenv.config();

if (!process.env.SERVER_PORT || isNaN(+process.env.SERVER_PORT))
  throw new Error("Error in server port.");

const SERVER_PORT = process.env.SERVER_PORT;

app.listen(SERVER_PORT, () => {
  console.log(`Api listening on port ${SERVER_PORT}`);
});
