document.addEventListener('DOMContentLoaded', () => {
    const usuarioActivo = localStorage.getItem('arjet_usuario_activo');
    const usuariosBD = JSON.parse(localStorage.getItem('arjet_usuarios')) || {};

    if (!usuarioActivo) {
        window.location.href = 'Usuario.html';
        return;
    }

    // --- CORRECCIÓN DEL BUG: Cargar datos de perfil en elementos de texto ---
    if (usuariosBD[usuarioActivo]) {
        const datosUsuario = usuariosBD[usuarioActivo];

        document.getElementById('resumen-nombre').textContent = datosUsuario.nombre || '-';
        document.getElementById('resumen-dni').textContent = datosUsuario.dni || '-';
        document.getElementById('resumen-email').textContent = datosUsuario.email || '-';
        
        const bloqueTel = document.getElementById('bloque-telefono');
        if (datosUsuario.telefono) {
            document.getElementById('resumen-telefono').textContent = datosUsuario.telefono;
            bloqueTel.style.display = 'block';
        } else {
            bloqueTel.style.display = 'none';
        }
    }

    // Dibujamos el resumen del vuelo unificado
    localStorage.removeItem('descuentoAplicado'); // Limpiamos cupones previos al cargar
    window.renderizarResumenVuelo('resumen-vuelo');

    // Sistema de Cupones Reactivo
    const cupones = { 'ARJET10': 0.10, 'VERANO20': 0.20 };
    const btnCupon = document.getElementById('btn-aplicar-cupon');
    
    if (btnCupon) {
        btnCupon.addEventListener('click', () => {
            const codigo = document.getElementById('input-cupon').value.trim().toUpperCase();
            const mensaje = document.getElementById('mensaje-cupon');

            if (cupones[codigo]) {
                localStorage.setItem('descuentoAplicado', cupones[codigo]);
                mensaje.textContent = `Cupón aplicado: -${cupones[codigo] * 100}%`;
                mensaje.className = 'mensaje-cupon-ok';
            } else {
                localStorage.removeItem('descuentoAplicado');
                mensaje.textContent = 'Cupón inválido';
                mensaje.className = 'mensaje-cupon-error';
            }
            // Redibujamos la tarjeta para que recalcule con el descuento
            window.renderizarResumenVuelo('resumen-vuelo');
        });
    }

    // Procesamiento del Formulario de Compra
    const formCheckout = document.getElementById('form-checkout');
    if (formCheckout) {
        formCheckout.addEventListener('submit', (evento) => {
            evento.preventDefault();

            const metodoPago = document.querySelector('input[name="pago"]:checked');
            const errorPago = document.getElementById('error-pago');
            if (errorPago) errorPago.textContent = '';

            if (!metodoPago) {
                if (errorPago) errorPago.textContent = 'Seleccioná un método de pago para continuar.';
                return;
            }

            // Recuperamos los datos del usuario activo directamente de la BD interna
            const datosUsuario = usuariosBD[usuarioActivo];
            const precioFinalCalculado = parseFloat(localStorage.getItem('precioTotalFinalCalculado')) || 0;
            const asientos = localStorage.getItem('asientosSeleccionados') || 'No asignado';
            const busqueda = JSON.parse(localStorage.getItem('busquedaVuelo')) || {};

            const nuevaReserva = {
                idReserva: "AR-" + Math.floor(Math.random() * 10000) + "X",
                origen: (busqueda.origen || 'EZE').toUpperCase(),
                destino: (busqueda.destino || 'MAD').toUpperCase(),
                fechaIda: busqueda.fechaIda || "A confirmar",
                precioTotal: precioFinalCalculado.toFixed(2),
                asientos: asientos,
                estado: "Pagado",
                pasajeros: {
                    nombre: datosUsuario.nombre,
                    dni: datosUsuario.dni,
                    email: datosUsuario.email,
                    telefono: datosUsuario.telefono || ''
                },
                checkin: false 
            };

            // Guardamos la reserva en el perfil del usuario activo
            usuariosBD[usuarioActivo].reservas = usuariosBD[usuarioActivo].reservas || [];
            usuariosBD[usuarioActivo].reservas.push(nuevaReserva);

            localStorage.setItem('arjet_usuarios', JSON.stringify(usuariosBD));
            
            // Limpieza de estados temporales post-compra
            localStorage.removeItem('costoEquipaje');
            localStorage.removeItem('descuentoAplicado');
            localStorage.removeItem('asientosSeleccionados');
            localStorage.removeItem('precioTotalFinalCalculado');
            
            window.location.href = 'MisReservas.html';
        });
    }
});