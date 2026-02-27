//Variable global para recordar qué evento seleccionO el usuario
let idEventoSeleccionado = null;

// FunciOn que se dispara desde el botón INCRIRME
function prepararInscripcion(id) {
    idEventoSeleccionado = id;
    console.log("ID del evento para inscribir:", idEventoSeleccionado);
}

// 3. Lógica del Formulario de InscripciON
document.querySelector('#tarjeta form').addEventListener('submit', function(e) {
    e.preventDefault(); // Evita que la página se recargue

    // Captura y limpieza de espacios
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value.trim();

    // Validación de campos vacios
    if (!nombre || !email || !telefono) {
        alert("Por favor, llena todos los campos antes de enviar.");
        return; 
    }

    // Validación de telefono
    if (telefono.length !== 10 || isNaN(telefono)) {
        alert("El teléfono debe tener 10 números.");
        return;
    }

    // Carga de datos del LocalStorage
    let eventos = JSON.parse(localStorage.getItem('eventosU')) || [];
    let asistentes = JSON.parse(localStorage.getItem('asistentesU')) || [];
    const evento = eventos.find(ev => ev.id === idEventoSeleccionado);

    // Validacion de Cupo
    if (!evento || evento.cupo <= 0) {
        alert("Ya no hay cupos para este evento.");
        return;
    }

   // Validación de Correo Duplicado 
    const emailNormalizado = email.toLowerCase(); // Convertimos el input actual

    const duplicado = asistentes.find(as => 
        as.idEvento === idEventoSeleccionado && 
     as.email.toLowerCase() === emailNormalizado // Comparamos ambos en minusculas
    );

    if (duplicado) {
        alert("Este correo ya está registrado en este evento.");
        return;
    }

    // Creación del nuevo asistente con ID unico 
    const nuevoAsistente = {
        id: Date.now(),
        idEvento: idEventoSeleccionado,
        nombre: nombre,
        email: email,
        telefono: telefono,
        estado: "Pendiente" 
    };

    // Guardado persistente
    asistentes.push(nuevoAsistente);
    localStorage.setItem('asistentesU', JSON.stringify(asistentes));

    // Descontar cupo y guardar actualizacion
    evento.cupo -= 1; 
    localStorage.setItem('eventosU', JSON.stringify(eventos));

    alert("¡Inscripción exitosa!");
    
    // Limpieza y cierre del modal
    this.reset();
    const modalElement = document.getElementById('tarjeta');
    const modal = bootstrap.Modal.getInstance(modalElement);
    if (modal) modal.hide();

    // Actualizar las tarjetas del index en tiempo real
    if (typeof renderizarEventos === 'function') {
        renderizarEventos();
    }
});