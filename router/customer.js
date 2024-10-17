const mongoose = require("mongoose")
const express = require("express")
const router = express.Router()
const Joi = require("joi")

mongoose
  .connect("mongodb://localhost/customer")
  .then(() => console.log("connected"))
  .catch((err) => console.log("error"))

const customerSchema = new mongoose.Schema({
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

const Customer = mongoose.model("Customer", customerSchema)

router.get("/", async (req, res) => {
  const customers = await Customer.find().sort({ name: 1 })
  res.send(customers).status(400)
})

router.post("/", async (req, res) => {
  const result = validateCustomer(req.body)
  if (result.error) return res.send(result.error.details[0].message).status(400)
  let customers = new Customer({ name: req.body.name })
  customers = await customers.save()
  res.send(customers).status(201)
})

router.put("/:id", async (req, res) => {
  const result = validateCustomer(req.body)
  if (result.error) return res.send(result.error.details[0].message).status(400)

  const customers = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      phone: req.body.phone,
      isGold: req.body.isGold,
    },
    { new: true }
  )
  if (!customers)
    return res.send("The Genre with the given id is not found").status(400)
  res.send(customers).status(201)
})

router.delete("/:id", async (req, res) => {
  const customers = await Customer.findByIdAndDelete(req.params.id)
  if (!customers) return res.send("invalid request").status(400)
  return res.send(customers).status(200)
})

router.get("/:id", async (req, res) => {
  const customers = await Customer.findById(req.params.id)
  if (!customers)
    return res.status(404).send("The genre with the given ID is not found")
  return res.send(customers).status(200)
})

function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().max(255).min(1).required(),
    phone: Joi.string().required(),
  })
  const result = schema.validate(customer)
  return result
}

module.exports = router
