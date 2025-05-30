const express = require("express")
const router = express.Router()
const crud = require("../models/crudPublicAmigos")

router.get("/amigos",crud.amigosPost)

module.exports = router