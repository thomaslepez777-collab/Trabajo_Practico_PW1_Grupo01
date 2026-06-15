document.addEventListener('DOMContentLoaded', () => {
    const formAsientos = document.querySelector('.formulario-asientos');
    const btnContinuar = document.querySelector('.btn-continuar');
    
    const textoRuta = document.getElementById('ruta-detalle');
    const textoPasajeros = document.getElementById('pasajeros-detalle');
    const textoPrecioTotal = document.getElementById('precio-total-detalle');

    const busquedaGuardada = localStorage.getItem('busquedaVuelo');
    const busqueda = busquedaGuardada ? JSON.parse(busquedaGuardada) : null;
    
    const precioVueloUnitario = parseFloat(localStorage.getItem('vueloSeleccionadoPrecio')) || 550;

    const cantidadPasajeros = busqueda ? parseInt(busqueda.pasajeros) : 1;
    const origen = busqueda ? busqueda.origen.toUpperCase() : 'EZE';
    const destino = busqueda ? busqueda.destino.toUpperCase() : 'MAD';

    const precioTotal = precioVueloUnitario * cantidadPasajeros;

    if(textoRuta) textoRuta.textContent = `${origen} ➔ ${destino}`;
    if(textoPasajeros) textoPasajeros.textContent = `${cantidadPasajeros} Pasajero(s) x $${precioVueloUnitario} USD`;
    if(textoPrecioTotal) textoPrecioTotal.textContent = `$${precioTotal} USD`;

    localStorage.setItem('precioTotalReserva', precioTotal);
    localStorage.setItem('cantidadPasajeros', cantidadPasajeros);

    btnContinuar.disabled = true;
    btnContinuar.style.opacity = '0.5';
    btnContinuar.style.cursor = 'not-allowed';

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

            if (asientosElegidos.length === cantidadPasajeros) {
                btnContinuar.disabled = false;
                btnContinuar.style.opacity = '1';
                btnContinuar.style.cursor = 'pointer';
            } else {
                btnContinuar.disabled = true;
                btnContinuar.style.opacity = '0.5';
                btnContinuar.style.cursor = 'not-allowed';
            }
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