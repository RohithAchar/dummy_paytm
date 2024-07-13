const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
// Routes
const rootRouter = require("./routers/index");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/v1", rootRouter);

app.listen(3000, () => console.log("Running on port 3000"));
