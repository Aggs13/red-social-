const getCrud = require("../models/conexion")


exports.amigosPost = async(req,res)=>{

    try {

        const idUsuario = req.session.idUsuario
        const usuario = req.session.usuario
        const logeo = req.session.logeo

        if(!logeo){
            return res.send("Inicie sesion")
        }

        const crud = await getCrud()

       const [postAmigos] = await crud.execute(`
        SELECT p.id_post, 
            p.id_usuario_post, 
            p.contenido_texto_post, 
            p.contenido_img_post,
            p.tipo_post, 
            p.titulo_img_post,
            u.nombre_usuario 
        FROM amigos a 
        JOIN usuarios u ON (u.id_usuario = a.id_usuario_uno OR u.id_usuario = a.id_usuario_dos)
        JOIN post p ON p.id_usuario_post = u.id_usuario 
        WHERE (? IN (a.id_usuario_uno, a.id_usuario_dos)) AND u.id_usuario != ? ORDER BY p.id_post DESC

        `,[idUsuario,idUsuario])


        const [amigos] = await crud.execute(`
            SELECT 
                u.id_usuario,
                u.nombre_usuario,
                a.id_amigos,
                a.estado
            FROM amigos a
            JOIN usuarios u 
                ON (u.id_usuario = a.id_usuario_uno AND a.id_usuario_dos = ?)
                OR (u.id_usuario = a.id_usuario_dos AND a.id_usuario_uno = ?)
            WHERE a.estado = 'amigos'
            `, [idUsuario, idUsuario]);

        res.render("publicAmigos",{postAmigos,idUsuario,logeo,amigos,usuario})
    } catch (error) {
        
    }


}

