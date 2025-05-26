const express = require("express")
const router = express.Router()
const crud = require("../models/crudIndex")
const crudP = require("../models/crudPublicacion")


module.exports = (upload)=>{



router.get("",crud.getInicio)

router.get("/solicitud/:idUsuario/aceptar",crud.aceptarSolicutud)
router.get("/solicitud/:idUsuario/rechazar",crud.rechazarSolicitud)

router.post("/publicarTexto",crudP.postPublicacion)

router.post("/PublicarFoto",upload.single("postImg"),crudP.postImg,(req,res)=>{
    if(!req.file){
        console.log("no se pudo subir la imagen")
    }else{
        res.redirect("/")
    }
})

router.get("/salir/:idUsuario",(req,res)=>{
    req.session.destroy()
    res.redirect("/")
})

return router

}


