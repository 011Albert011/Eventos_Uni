function guardar() {
    const nombre = document.querySelector("#nombre").value;
    const email = document.querySelector("#email").value;
    const mensaje = document.querySelector("#mensaje").value;
    //Obtenemos todos los datos de la localstorage para ahora convertirlo de json string a objeto o creamos un arreglo vacio si este esta vacio 
    let datosObtenidos = JSON.parse(localStorage.getItem("misdatos")) || [];
    datosObtenidos.push(
        {
            nombreUser: nombre,
            emailUser: email,
            mensajeUser: mensaje,
        }
    )
    const datosstorage=JSON.stringify(datosObtenidos)
    localStorage.setItem("misdatos", datosstorage)
    console.log(datosObtenidos)
    alert("Los datos han sido guardados exitosamente")
}
