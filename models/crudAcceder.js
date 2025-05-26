
  const getCrud = require("./conexion")
  const bcrypjs = require("bcryptjs")

  exports.postUsuario = async(req,res)=>{
    try {

      const usuario = req.body.usuarioReg
      const email = req.body.emailReg
      const pass = await bcrypjs.hash(req.body.passReg,8)
      const rol = "normal"

      const crud = await getCrud()
      await crud.execute("INSERT INTO usuarios (nombre_usuario, email_usuario, pass_usuario, rol_usuario) VALUES( ? , ? , ? , ?) ",[usuario,email,pass,rol])
      res.redirect("/")

    } catch (error) {

      console.log("error")
      console.log(error)
      res.send("error") 
    }
  }


  exports.iniciarSesion = async(req,res)=>{

    try {
      const usuario = req.body.usuarioAcc
      const pass = req.body.passAcc
      const email = req.body.emailAcc
      
      if(usuario && pass){
        const crud = await getCrud()
        const [results] = await crud.execute("SELECT * FROM usuarios WHERE nombre_usuario = ?",[usuario])
        if(results.length > 0){

          const passCorrecta = await bcrypjs.compare(pass,results[0].pass_usuario)

          if(!passCorrecta){
            console.log("contraseña incorrecta")
            let mostrarMensaje = true
            res.render("acceder", {mostrarMensaje})
          }else{
            req.session.logeo = true
            req.session.idUsuario = results[0].id_usuario
            req.session.usuario = results[0].nombre_usuario
            req.session.gmail = results[0].email_usuario
            req.session.rol = results[0].rol_usuario

            res.redirect("/")
          }
        }else
        res.render("acceder", { errorUsuario: true })
      }
    
    } catch (error) {
      res.send("error")
      console.log(error)
    }
    
  }


