require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "../", "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));

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

 
  if ((error.status === 404)) {
    return res.status(404).json({
      msg: error.message,
      status: 404,
    });
  }

  return res.status(500).json({
    msg: "Internal srer error",
  });
});

app.listen(8080, () => {
  console.log("Server Listening on port ", process.env.PORT);
});


//video 03 min: 13.01