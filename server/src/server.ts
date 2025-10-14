import express from "express";
import homeRoute from "./Routes/homeRoute";
// import cors from "cors";

const app = express();
// app.use(cors());
app.use(express.json());

app.use("/api/home", homeRoute);

export default app;
