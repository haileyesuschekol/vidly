const express = require("express")

const app = express()
app.use(express.json())

const genres = [
  { id: 1, name: "action" },
  { id: 2, name: "adventure" },
  { id: 3, name: "comedy" },
]

app.get("/", (req, res) => {
  res.send("home").status(400)
})

app.get("/api/genres", (req, res) => {
  res.send(genres).status(400)
})

app.get("/api/genres/:id", (req, res) => {
  const finder = genres.find((g) => g.id === parseInt(req.params.id))
  if (!finder) {
    return res.send("not found").status(400)
  } else {
    return res.send(finder).status(200)
  }
})

// app.post('/api/genres', (req,res)=>{

// })

app.listen(3000, () => {
  console.log("listen in port 3000")
})
