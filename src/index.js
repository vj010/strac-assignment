const express = require("express");
require("dotenv").config();

const app = express();

app.use(express.json());

//router for authentication
app.use("/auth", () => {});

//router for one drive
app.use("/onedrive", () => {});

const PORT = process.env.PORT || 4999;

app.listen(PORT, () => {
  console.log("server started on port:", PORT);
});
