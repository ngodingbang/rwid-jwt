import "./env.js";
import router from "./routes/index.js";
import express from "express";

const app = express();

app.use(express.json());

app.use(router);

app.listen(process.env.PORT);

export default app;
