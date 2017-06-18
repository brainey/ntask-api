import express from "express";
import consign from "consign";

const PORT = process.env.PORT || 5000

const app = express();

app.set("json spaces", 4);

consign().include("routes").into(app);

app.listen(PORT, () => console.log(`NTask API - Port ${PORT}`));
