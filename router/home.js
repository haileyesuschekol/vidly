const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
  return res.send("home").status(400)
})

module.exports = router
