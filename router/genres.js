const mongoose = require("mongoose")
const express = require("express")
const router = express.Router()
const Joi = require("joi")

const genresSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
})

const Genre = mongoose.model("Genre", genresSchema)

router.get("/", async (req, res) => {
  const genres = await Genre.find().sort({ name: 1 })
  res.send(genres).status(400)
})

router.post("/", async (req, res) => {
  const result = validateGenre(req.body)
  if (result.error) return res.send(result.error.details[0].message).status(400)
  let genres = new Genre({ name: req.body.name })
  genres = await genres.save()
  res.send(genres).status(201)
})

router.put("/:id", async (req, res) => {
  const result = validateGenre(req.body)
  if (result.error) return res.send(result.error.details[0].message).status(400)

  const genres = await Genre.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    { new: true }
  )
  if (!genres)
    return res.send("The Genre with the given id is not found").status(400)
  res.send(genres).status(201)
})

router.delete("/:id", async (req, res) => {
  const genres = await Genre.findByIdAndDelete(req.params.id)
  if (!genres) return res.send("invalid request").status(400)
  return res.send(genres).status(200)
})

router.get("/:id", async (req, res) => {
  const genres = await Genre.findById(req.params.id)
  if (!genres)
    return res.status(404).send("The genre with the given ID is not found")
  return res.send(genres).status(200)
})

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().max(255).min(2).required(),
  })
  const result = schema.validate(genre)
  return result
}

module.exports = router
