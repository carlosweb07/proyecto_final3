const socket = io()

// Websockets:
socket.on("mensaje", function(mensaje){
    console.log(mensaje.data)
    document.getElementById("data").innerHTML = mensaje.data
})
// socket.emit("usuario",{"name":"Carlos"})

var btn2 = document.getElementById("btnRegistro")
btn2.addEventListener("click", enviarDatos)

function enviarDatos(){
    var nombre = document.getElementById("nombre").value
    socket.emit("usuario", {nombre})
}

socket.on("new_usuario", function(data){ // Lo escucha
    console.log(data.usuarios) // Lo muestra en el console.log
})
