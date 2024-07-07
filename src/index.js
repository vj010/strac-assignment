const express = require("express");

const authRouter = require("./routes/auth.router");
const oneDriveRouter = require("./routes/onedrive.router");
require("dotenv").config();
// const { fork } = require("child_process");
// const child = fork("./src/blessed.js");

const app = express();

app.use(express.json());

//router for authentication
app.use("/auth", authRouter);

//router for one drive
app.use("/onedrive", oneDriveRouter);

const PORT = process.env.PORT || 4999;

app.listen(PORT, () => {
  console.log("server started on port:", PORT);
  require("./console");
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error: err.message,
  });
});
