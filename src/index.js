const express = require("express");

const authRouter = require("./routes/auth.router");
require("dotenv").config();

const app = express();

app.use(express.json());

//router for authentication
app.use("/auth", authRouter);

//router for one drive
app.use("/onedrive", () => {});

const PORT = process.env.PORT || 4999;

app.listen(PORT, () => {
  console.log("server started on port:", PORT);
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error: err.message,
  });
});
