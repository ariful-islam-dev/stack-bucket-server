require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { useMorgan } = require('./middlewares/index')
const path = require("path");

const mongoose = require("mongoose");

console.log(process.env.NODE_ENV);
const app = express();
mongoose
  .connect(process.env.DATA_BASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected");
  })
  .catch((e) => {
    console.log(e.message);
  });

useMorgan(app);

app.use(cors());
app.use(express.static(path.join(__dirname, "../", "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.get("/", (req, res) => {
  // throw new Error("Custom Error");
  res.status(200).json({
    msg: "Hello World",
  });
});

app.use((req, res, next) => {
  const error = new Error("404 Page Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  if (error.status === 404) {
    return res.status(404).json({
      msg: error.message,
      status: 404,
    });
  }

  return res.status(500).json({
    msg: "Internal srer error",
  });
});

app.listen(process.env.PORT, () => {
  console.log("Server Listening on port ", process.env.PORT);
});

//video 03 min: 13.01
