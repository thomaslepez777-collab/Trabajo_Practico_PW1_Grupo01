document.addEventListener('DOMContentLoaded', () => {
    const formBuscador = document.getElementById('form-buscador');
    const radioIdaVuelta = document.getElementById('idaVuelta');
    const radioSoloIda = document.getElementById('soloIda');
    const inputFechaRegreso = document.getElementById('fechaRegreso');

    function toggleFechaRegreso() {
        if (radioSoloIda.checked) {
            inputFechaRegreso.disabled = true;
            inputFechaRegreso.value = '';
        } else {
            inputFechaRegreso.disabled = false;
        }
    }

    if (radioIdaVuelta && radioSoloIda) {
        radioIdaVuelta.addEventListener('change', toggleFechaRegreso);
        radioSoloIda.addEventListener('change', toggleFechaRegreso);
    }

    if(formBuscador) {
        formBuscador.addEventListener('submit', (evento) => {
            evento.preventDefault();

            const origen = document.getElementById('origen').value;
            const destino = document.getElementById('destino').value;
            const fechaSalida = document.getElementById('fechaSalida').value;
            const fechaRegreso = document.getElementById('fechaRegreso').value;
            const pasajeros = document.getElementById('pasajeros').value;
            const tipoViaje = document.querySelector('input[name="tipoViaje"]:checked').value;

            if (!origen || !destino) {
                alert('Por favor, seleccioná un origen y un destino válidos.');
                return;
            }

            if (origen === destino) {
                alert('El origen y el destino no pueden ser iguales. Por favor, modificalos.');
                return;
            }

            if (tipoViaje === 'ida_vuelta' && !fechaRegreso) {
                alert('Por favor, ingresá una fecha de regreso para tu vuelo de ida y vuelta.');
                return;
            }

            if (tipoViaje === 'ida_vuelta' && new Date(fechaRegreso) < new Date(fechaSalida)) {
                alert('La fecha de regreso no puede ser anterior a la fecha de salida.');
                return;
            }

            const datosBusqueda = {
                tipoViaje: tipoViaje,
                origen: origen,
                destino: destino,
                fechaIda: fechaSalida,
                fechaRegreso: fechaRegreso,
                pasajeros: pasajeros
            };
            
            localStorage.setItem('busquedaVuelo', JSON.stringify(datosBusqueda));
            localStorage.setItem('cantidadPasajeros', pasajeros);

            window.location.href = 'pages/Vuelos.html';
        });
    }
});