document.addEventListener('DOMContentLoaded', () => {
    const formBuscador = document.getElementById('form-buscador');

    formBuscador.addEventListener('submit', (evento) => {
        evento.preventDefault();

        const origen = document.getElementById('origen').value.trim().toLowerCase();
        const destino = document.getElementById('destino').value.trim().toLowerCase();
        const fechaSalida = document.getElementById('fechaSalida').value;
        const fechaRegreso = document.getElementById('fechaRegreso').value;
        const pasajeros = document.getElementById('pasajeros').value;
        const tipoViaje = document.querySelector('input[name="tipoViaje"]:checked').value;

        if (origen === destino) {
            alert('El origen y el destino no pueden ser iguales. Por favor, modificalos.');
            return;
        }

        if (tipoViaje === 'ida_vuelta' && !fechaRegreso) {
            alert('Por favor, ingresá una fecha de regreso.');
            return;
        }

        const datosBusqueda = {
            tipoViaje: tipoViaje,
            origen: origen,
            destino: destino,
            fechaSalida: fechaSalida,
            fechaRegreso: fechaRegreso,
            pasajeros: pasajeros
        };
        localStorage.setItem('busquedaVuelo', JSON.stringify(datosBusqueda));

        window.location.href = 'pages/Vuelos.html';
    });
});