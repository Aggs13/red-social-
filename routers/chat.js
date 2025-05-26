const express = require("express")
const router = express.Router()
const crud = require("../models/crudChat")

router.get("/:idChat",crud.getChat)
router.post("/:idChat",crud.postMensaje)

module.exports = router