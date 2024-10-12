const express = require("express")
const app = express()
const genres = require("./router/genres")
const home = require("./router/home")

app.use(express.json())

app.use("/", home)
app.use("/api/genres", genres)

app.listen(3000, () => {
  console.log("listen in port 3000")
})
