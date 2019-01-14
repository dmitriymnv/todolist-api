const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const BodyParser = require('body-parser');
const Promise = require('bluebird');
const dotenv = require('dotenv');

const auth = require("./routes/auth");
const user = require("./routes/user");
const tasks = require("./routes/tasks");
const profile = require("./routes/profile");
const family = require("./routes/family");

dotenv.config();

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(BodyParser.json());
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/todolist', { useNewUrlParser: true });

app.use("/api/auth", auth);
app.use("/api/user", user);
app.use("/api/tasks", tasks);
app.use("/api/profile", profile);
app.use("/api/family", family);


app.listen(3030, () => console.log("Сервер запущен localhost:3030"));