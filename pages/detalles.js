document.addEventListener('DOMContentLoaded', () => {
    const formAsientos = document.querySelector('.formulario-asientos');

    window.renderizarResumenVuelo('resumen-vuelo');

    const busquedaGuardada = localStorage.getItem('busquedaVuelo');
    const busqueda = busquedaGuardada ? JSON.parse(busquedaGuardada) : null;
    const cantidadPasajeros = busqueda ? parseInt(busqueda.pasajeros) : 1;

    const inputsAsiento = document.querySelectorAll('.input-asiento');
    let asientosElegidos = []; 

    inputsAsiento.forEach(input => {
        input.addEventListener('change', (e) => {
            const checkboxesSeleccionados = document.querySelectorAll('.input-asiento:checked');

            if (checkboxesSeleccionados.length > cantidadPasajeros) {
                e.target.checked = false; 
                alert(`Solo podés elegir ${cantidadPasajeros} asiento(s) para esta reserva.`);
                return; 
            }

            asientosElegidos = Array.from(checkboxesSeleccionados).map(cb => cb.value);
        });
    });

    if(formAsientos) {
        formAsientos.addEventListener('submit', (evento) => {
            evento.preventDefault();

            if (asientosElegidos.length !== cantidadPasajeros) {
                alert(`Te falta seleccionar asientos. Elegiste ${asientosElegidos.length} de ${cantidadPasajeros}.`);
                return;
            } 
            
            localStorage.setItem('asientosSeleccionados', asientosElegidos.join(', '));
            window.location.href = 'equipaje.html';
        });
    }
});