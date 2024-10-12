const express = require("express")
const Joi = require("joi")
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

app.post("/api/genres", (req, res) => {
  validateCourse(req.body)
  const newGenres = { id: genres.length + 1, name: req.body.name }
  genres.push(newGenres)
  res.send(genres).status(201)
})

app.put("/api/genres/:id", (req, res) => {
  const finder = genres.find((g) => g.id === parseInt(req.params.id))
  if (!finder) {
    res.send("not found").status(400)
  }
  validateCourse(req.body)
  finder.name = req.body.name
  res.send(finder).status(201)
})

app.delete("/api/genres/:id", (req, res) => {
  const finder = genres.find((g) => g.id === parseInt(req.params.id))
  if (!finder) {
    return res.send("invalid request").status(400)
  } else {
    const index = genres.indexOf(finder)
    genres.splice(index, 1)
    return res.send(genres).status(200)
  }
})

function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().max(20).min(1).required(),
  })
  const result = schema.validate(course)
  if (result.error) return res.send(result.error.details[0].message).status(400)
}

app.listen(3000, () => {
  console.log("listen in port 3000")
})
