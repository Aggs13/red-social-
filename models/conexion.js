const mysql = require("mysql2/promise")

let conexion

async function getConexion() {
    if(!conexion){
        try {

            conexion = await mysql.createConnection({
            database: "red_social_db" ,
            password: "" ,
            user:"root" ,
            host: "localhost"
        })
            console.log("conexion exitosa") 
        } catch (error) {
            console.error("Error al conectar:", error);
        }

    }
    return conexion
}

module.exports = getConexion