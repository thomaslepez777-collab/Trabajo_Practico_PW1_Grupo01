document.addEventListener('DOMContentLoaded', () => {
    const estaLogueado = localStorage.getItem('usuarioLogueado');
    if (estaLogueado !== 'true') {
        window.location.href = 'Usuario.html';
        return;
    }

    // --- Resumen del vuelo ---
    function renderizarResumen() {
        const contenedor = document.getElementById('resumen-vuelo');
        if (!contenedor) return;

        const busquedaGuardada = localStorage.getItem('busquedaVuelo');
        const busqueda = busquedaGuardada ? JSON.parse(busquedaGuardada) : {};
        const precioBase = parseFloat(localStorage.getItem('precioTotalFinal') || localStorage.getItem('precioTotalReserva') || 0);
        const asientos = localStorage.getItem('asientosSeleccionados') || 'No asignado';

        const origen = (busqueda.origen || 'Origen').toUpperCase();
        const destino = (busqueda.destino || 'Destino').toUpperCase();

        let html = '<div class="resumen-item"><span class="resumen-label">Ruta:</span><span>' + origen + ' ➔ ' + destino + '</span></div>';
        html += '<div class="resumen-item"><span class="resumen-label">Fecha de ida:</span><span>' + (busqueda.fechaIda || 'A confirmar') + '</span></div>';

        if (busqueda.tipoViaje === 'ida-vuelta' && busqueda.fechaRegreso) {
            html += '<div class="resumen-item"><span class="resumen-label">Fecha de regreso:</span><span>' + busqueda.fechaRegreso + '</span></div>';
        }

        html += '<div class="resumen-item"><span class="resumen-label">Asientos:</span><span>' + asientos + '</span></div>';
        html += '<div class="resumen-item resumen-total"><span class="resumen-label">Total a pagar:</span><span id="precio-total-display">$' + precioBase.toFixed(2) + '</span></div>';

        contenedor.innerHTML = html;
    }

    renderizarResumen();

    // --- Cupón de descuento ---
    const cupones = { 'ARJET10': 0.10, 'VERANO20': 0.20 };
    let descuentoAplicado = 0;

    const btnCupon = document.getElementById('btn-aplicar-cupon');
    if (btnCupon) {
        btnCupon.addEventListener('click', () => {
            const codigo = document.getElementById('input-cupon').value.trim().toUpperCase();
            const mensaje = document.getElementById('mensaje-cupon');
            const precioBase = parseFloat(localStorage.getItem('precioTotalFinal') || localStorage.getItem('precioTotalReserva') || 0);
            const display = document.getElementById('precio-total-display');

            if (cupones[codigo]) {
                descuentoAplicado = cupones[codigo];
                const nuevoTotal = precioBase * (1 - descuentoAplicado);
                if (display) display.textContent = '$' + nuevoTotal.toFixed(2);
                mensaje.textContent = 'Cupón aplicado: -' + (descuentoAplicado * 100) + '%';
                mensaje.className = 'mensaje-cupon-ok';
            } else {
                descuentoAplicado = 0;
                if (display) display.textContent = '$' + precioBase.toFixed(2);
                mensaje.textContent = 'Cupón inválido';
                mensaje.className = 'mensaje-cupon-error';
            }
        });
    }

    // --- Submit con validación ---
    const formCheckout = document.getElementById('form-checkout');
    if (formCheckout) {
        formCheckout.addEventListener('submit', (evento) => {
            evento.preventDefault();

            const nombre = document.getElementById('nombre-pasajero').value.trim();
            const dni = document.getElementById('dni-pasajero').value.trim();
            const email = document.getElementById('email-pasajero').value.trim();
            const metodoPago = document.querySelector('input[name="pago"]:checked');

            document.getElementById('error-nombre').textContent = '';
            document.getElementById('error-dni').textContent = '';
            document.getElementById('error-email').textContent = '';
            document.getElementById('error-pago').textContent = '';

            let valido = true;

            if (!nombre) {
                document.getElementById('error-nombre').textContent = 'El nombre es obligatorio.';
                valido = false;
            }
            if (!dni || !/^\d{7,8}$/.test(dni)) {
                document.getElementById('error-dni').textContent = 'El DNI debe tener 7 u 8 dígitos numéricos.';
                valido = false;
            }
            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                document.getElementById('error-email').textContent = 'Ingresá un correo electrónico válido.';
                valido = false;
            }
            if (!metodoPago) {
                document.getElementById('error-pago').textContent = 'Seleccioná un método de pago para continuar.';
                valido = false;
            }

            if (!valido) return;

            // Lógica original de reserva (precio con descuento aplicado)
            const precioBase = parseFloat(localStorage.getItem('precioTotalFinal') || localStorage.getItem('precioTotalReserva') || 0);
            const precioFinal = precioBase * (1 - descuentoAplicado);
            const asientos = localStorage.getItem('asientosSeleccionados') || 'No asignado';
            const busquedaGuardada = localStorage.getItem('busquedaVuelo');
            const busqueda = busquedaGuardada ? JSON.parse(busquedaGuardada) : {origen: 'EZE', destino: 'MAD'};
            const nuevaReserva = {
                idReserva: "AR-" + Math.floor(Math.random() * 10000) + "X",
                origen: busqueda.origen.toUpperCase(),
                destino: busqueda.destino.toUpperCase(),
                fechaIda: busqueda.fechaIda || "A confirmar",
                precioTotal: precioFinal,
                asientos: asientos,
                estado: "Pagado",
                pasajeros: nombre
            };

            let historialReservas = JSON.parse(localStorage.getItem('historialReservas')) || [];
            historialReservas.push(nuevaReserva);
            localStorage.setItem('historialReservas', JSON.stringify(historialReservas));
            localStorage.removeItem('precioTotalFinal');
            localStorage.removeItem('asientosSeleccionados');
            window.location.href = 'MisReservas.html';
        });
    }
});
