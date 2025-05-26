const express = require("express")
const app = express()
const bcripjs = require("bcryptjs")
const session = require("express-session")
const dotenv = require("dotenv")
const multer = require("multer")
const fs = require("node:fs")
const path = require("path")


app.set("view engine", "ejs")
app.use("/resourses", express.static(__dirname + "/public"))
app.use("/uploads",express.static(__dirname + "/uploads"))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(session({
    secret:"secreto",
    resave:true,
    saveUninitialized:true

}))


const uploadDir = path.join(__dirname,"/uploads")
if(!fs.existsSync((uploadDir))){
    fs.mkdirSync(uploadDir)
}

const fecha = new Date()
const fechaArreglada = fecha.toUTCString().replaceAll(":","-").replaceAll(" ","_").replaceAll(",","")
const fechaPublicacion = fechaArreglada
console.log(fechaPublicacion)


const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,"uploads/")
    },

    filename: (req,file,cb)=>{
        cb(null,file.originalname +"-"+ fechaPublicacion)
    }
})



const upload = multer({storage:storage})

app.listen(3000,(req,res)=>{
    console.log("Conexion establecida en http://localhost:3000/")
})


app.use((req, res, next) => {
    res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
    next();
})

const router = require("./routers/routers")(upload)
app.use("/",router)