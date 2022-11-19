require('dotenv').config()
require("./controllers/connect.js")()
const connection = conn()


// 1.- Importar las Dependencias:
const express  = require('express')
const app      = express()
const port     = process.env.PORT
const ejs      = require('ejs')
const servidor = require("http").Server(app)
const parser   = require('body-parser') 
const path     = require('path')
const bcrypt   = require('bcrypt')
const fetch    = require('node-fetch')
const jwt      = require('jsonwebtoken')

const io       = require('socket.io')(servidor)


// 2.- Crear los Middlewares:
app.use(parser.urlencoded({extended: true}))
app.set('views', path.join(__dirname, '../views'))
app.engine('ejs', ejs.__express)
app.set('view engine', 'ejs')
app.use(express.static('views'))


// 3.- Configuración del Servidor:
servidor.listen(port, function(){
    
    connection.connect(function(err){
        if(err) throw err
        console.log("Escuchando en el puerto 4000 y conectado a la base de datos")
    })
})


// Websockets:
io.on("connection", function(socket){
    
    console.log('Alguien se ha conectado desde: ' + socket.id)
    socket.emit("mensaje",{data:"Hola Mundo XD"})
    socket.on("usuario", function(data){
        
        const nombre = data.nombre
        console.log("nuevo usuario: " + nombre)
    })
    let usuarios = []
    socket.on("usuario", function(data){
        
        usuarios.push(data.nombre)
        socket.emit("new_usuario", {usuarios})
    })
})


// 4.- Rutas y Funciones:
app.get(process.env.ROOT_PATH, function(req, res){
    //res.send("Hola Mundo XD")
    res.render('index1')
})

app.get(process.env.ROOT2_PATH, function(req, res){

     res.render('index2')
})

app.get(process.env.ROOT3_PATH, function(req, res){

     res.render('index3')
})

app.get(process.env.REGISTER_PATH, function(rep, res){

    res.render('index4')
})

app.get(process.env.LOGIN_PATH, function(req, res){

    res.render('index5')
})

app.get(process.env.ROOT6_PATH, function(req, res){

    res.render('index6')
})

app.get(process.env.ROOT7_PATH, function(req, res){

    res.render('index7')
})

app.post("/add/register", (req, res) => {
    const {nombre, correo, pais, contraseña, confirmar_clv} = req.body
    if(contraseña !== confirmar_clv){
        res.send("Las contraseñas no coinciden"+"<a href='/index4'>Regresar</a>")
    }
    if(contraseña.length<10){
        res.send("La contraseña es muy corta, debe ser mayor a 10 digitos")
    }
    else if(contraseña == confirmar_clv){

        const payload = {
            nombre : nombre,
            correo : correo,
            clave  : contraseña,
            niv : "invitado"
        }
        jwt.sign(payload, process.env.KEY, {algorithm:"HS256" , expiresIn: 86400} , (err, token)=>{
            
            if(err) throw err
            bcrypt.hash(contraseña, 10, (err, hash) => {
                
                if(err) throw err
                const sql = `INSERT INTO registro1 (nombre_usuario, correo_usuario, pais_usuario, contraseña_usuario, confirmar_clave, token) VALUES ("${nombre}", "${correo}", "${pais}", "${hash}", "${confirmar_clv}","${token}");`
                
                connection.query(sql, (err, data, fields) => {
                    
                    if(err)throw err
                    res.redirect("/login")
                })    
            })
        })            
    }
})


app.post("/add/login", async (req, res) => {
    const {correo, contraseña} = req.body
    const sql = `SELECT * FROM registro1 WHERE correo_usuario = "${correo}";`

    const user = await new Promise((resolve, reject) => {
        connection.query(sql, (err, data, fields) => {
            bcrypt.compare(contraseña, data[0].contraseña_usuario, (err, comp) => {
                if(err) reject(err)
                resolve(comp)
            })
        })
    })

    if(user){
        const payload = {
            correo : correo,
            acceso : "administrador"
        }
        jwt.sign(payload, process.env.KEY , {algorithm:"HS256" , expiresIn: 86400} , (err, token) => {

            if(err) throw err
            const ingresar = `INSERT INTO logeo1(correo_logeo, token) VALUES ("${correo}", "${token}");`
                
            connection.query(ingresar, (err, data, fields) => {
                if(err)throw err   
                res.redirect("/verify")                 
            })
        })
    }
})


app.get("/verify",(req, res)=>{
    const sql = `SELECT * FROM logeo1;`
    connection.query(sql, (err, data, fields) => {
        
        if(err) throw err
        jwt.verify(data[0].token, process.env.KEY, (err, decoded) => {
            
            // if(decoded.acceso == "usuario"){
            //     res.redirect("/pagina6")
            // }

            if(decoded.acceso == "administrador"){
                res.redirect("/pagina7")
            }
        })
    })
})

// API XD:
app.get(process.env.ROOT8_PATH, async (req, res) => {

    res.render('index8')
})