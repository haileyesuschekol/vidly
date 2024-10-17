const mongoose = require("mongoose")
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

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().max(255).min(2).required(),
  })
  const result = schema.validate(genre)
  return result
}

exports.Genre = Genre
exports.validate = validateGenre
