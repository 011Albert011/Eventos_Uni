document.addEventListener("DOMContentLoaded", () => {
  const formEvento = document.getElementById("form-evento");
  const inputFecha = document.getElementById("fecha");

  // Bloquear fechas pasadas
  const hoy = new Date();
  hoy.setMinutes(hoy.getMinutes() - hoy.getTimezoneOffset());
  inputFecha.min = hoy.toISOString().slice(0, 16);

  formEvento.addEventListener("submit", function (e) {
    e.preventDefault();

    // Tomamos el valor del input (ej. "2026-02-26T22:19") y cambiamos la 'T' por un espacio
    const fechaFormateada = document
      .getElementById("fecha")
      .value.replace("T", " ");

    // Creamos el objeto
    const nuevoEvento = {
      id: Date.now(),
      titulo: document.getElementById("titulo").value,
      tipo: document.getElementById("tipo").value.toLowerCase(),
      fecha: fechaFormateada, // Usamos la variable ya formateada
      sede: document.getElementById("sede").value,
      cupo: parseInt(document.getElementById("cupo").value),
      descripcion: document.getElementById("descripcion").value,
    };

    // Leemos la lista de eventos
    let listaEventos = JSON.parse(localStorage.getItem("eventosU")) || [];

    listaEventos.push(nuevoEvento);
    localStorage.setItem("eventosU", JSON.stringify(listaEventos));

    alert("¡Evento creado exitosamente!");
    formEvento.reset();
  });
});
