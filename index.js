const mongoose = require("mongoose")
const express = require("express")
const app = express()
const genres = require("./router/genres")
const home = require("./router/home")
const { required } = require("joi")

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("mongoDb connected"))
  .catch((err) => console.log("error while connected"))

app.use(express.json())

app.use("/", home)
app.use("/api/genres", genres)

app.listen(3000, () => {
  console.log("listen in port 3000")
})
