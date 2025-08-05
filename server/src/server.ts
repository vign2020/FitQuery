import express from "express";

import homeRoute from "./Routes/homeRoute";

const app = express();
app.use(express.json());

app.use("/api/home", homeRoute);

export default app;
