// Tus datos de ejemplo (pueden venir de una API o base de datos)
const eventos = [
    {
        titulo: "Conferencia de JavaScript",
        fecha: "15/03/2024",
        tipo: "Conferencia",
        sede: "Auditorio Principal",
        cupo: 45
    },
    {
        titulo: "Taller de Angular",
        fecha: "20/03/2024",
        tipo: "Taller",
        sede: "Sala de Cómputo 3",
        cupo: 20
    },
    {
        titulo: "Networking con expertos",
        fecha: "25/03/2024",
        tipo: "Evento social",
        sede: "Terraza",
        cupo: 100
    },
    {
        titulo: "Networking con ciberseguridad",
        fecha: "25/03/2024",
        tipo: "Evento social",
        sede: "Terraza",
        cupo: 100
    },
    {
        titulo: "La era de la inteligencia artificial",
        fecha: "25/03/2024",
        tipo: "Evento social",
        sede: "Terraza",
        cupo: 100
    },
    {
        titulo: "La inteligencia artificial en la medicina",
        fecha: "25/03/2024",
        tipo: "Evento social",
        sede: "Terraza",
        cupo: 100
    }
];

// Creamos una tarjeta HTML para cada evento
function crearTarjetaHTML(evento, indice) {
    return `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title" id="titulo${indice}">${evento.titulo}</h5>
                <p class="card-text"><b>Fecha:</b> <span id="fecha${indice}">${evento.fecha}</span></p>
                <p class="card-text"><b>Tipo:</b> <span id="tipo${indice}">${evento.tipo}</span></p>
                <p class="card-text"><b>Sede:</b> <span id="sede${indice}">${evento.sede}</span></p>
                <p class="card-text"><b>Cupo restante:</b> <span id="cupo${indice}">${evento.cupo}</span></p>
                <div class="text-end">
                    <button class="card-button btn btn-success" data-bs-toggle="modal" data-bs-target="#tarjeta" data-evento-id="${indice}">
                        Inscribirme
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Función para renderizar todas las tarjetas
function renderizarTarjetas(contenedorId, eventos) {
    const contenedor = document.getElementById(contenedorId);
    contenedor.innerHTML = '';

    for (let index = 0; index < eventos.length; index++) {
        const evento = eventos[index];

        const tarjetaHTML = crearTarjetaHTML(evento, index);
        contenedor.innerHTML += tarjetaHTML;
    }

    // Agregar event listeners a los botones (si es necesario)
    agregarEventListenersABotones();
}
function guardarEnStorage(eventos) {
    localStorage.setItem('eventos', JSON.stringify(eventos));
}
// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function () {
    renderizarTarjetas('contenedor-tarjetas', eventos);
});
