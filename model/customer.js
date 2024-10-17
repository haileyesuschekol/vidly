const mongoose = require("mongoose")
const Joi = require("joi")

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    name: {
      type: String,
      require: true,
      maxlenght: 255,
    },
    phone: {
      type: String,
      require: true,
    },
    isGold: {
      type: Boolean,
      default: false,
    },
  })
)

function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().max(255).min(1).required(),
    phone: Joi.string().required(),
    isGold: Joi.boolean(),
  })
  const result = schema.validate(customer)
  return result
}

exports.Customer = Customer
exports.validate = validateCustomer
