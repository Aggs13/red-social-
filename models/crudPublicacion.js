const getCrud = require("./conexion")

exports.postPublicacion = async(req,res)=>{
    try {
        const idUsuario = req.session.idUsuario
        const texto = req.body.contenido
        const likes = 0
        const imgpath = "null"
        const tipo = "texto"
        const tituloPost = "null"
        const crud = await getCrud()
        crud.execute("INSERT INTO post(id_usuario_post,contenido_texto_post,contenido_img_post, titulo_img_post ,tipo_post,likes_post) VALUES(? , ? , ?, ?, ? ,?)",[idUsuario, texto, tituloPost, imgpath, tipo, likes]
)
        res.redirect("/")
    } catch (error) {
        res.send("error")
        console.log(error)
    }
}

// exports.getPublicacionTexto = async(req,res)=>{
//     try {
//         const crud = await getCrud()
//         const [results] = await crud.execute("SELECT * FROM post ORDER BY id_post DESC")

        
//     } catch (error) {
//         console.log(error)
//     }
// }


exports.postImg = async(req,res)=>{
    try {
        const idUsuario = req.session.idUsuario
        const texto = "null"
        const likes = 0
        const imgpath = req.file.path
        const tituloPost = req.body.tituloPost
        const tipo = "img"

        const crud = await getCrud()
        await crud.execute("INSERT INTO post(id_usuario_post,contenido_texto_post, titulo_img_post ,contenido_img_post,tipo_post,likes_post) VALUES(? , ? , ?, ?, ?, ?)",[idUsuario, texto, tituloPost, imgpath, tipo, likes]
)
        res.redirect("/")
    } catch (error) {
        console.log(error)
    }
}